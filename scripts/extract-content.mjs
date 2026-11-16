// One-time migration helper: parse the WordPress MySQL dump and emit raw,
// per-translation-group JSON for the real content, the real navigation menu, and
// the attachment map.
//
//   node scripts/extract-content.mjs
//
// Output lands in scripts/out/ and feeds scripts/generate-content.mjs.
//
// Correct mapping requires (lessons learned):
//  - the FRONT PAGE (wp_options page_on_front) is the homepage, not a generic page;
//  - page URLs are HIERARCHICAL (post_parent chain), e.g. about/i-filosofia-mas;
//  - EN pages are separate posts with their OWN slugs (our-philosophy), linked to
//    the Greek source via wp_icl_translations.trid (WPML);
//  - the nav comes from the real "Kyrio menou" menu, not an invented structure.

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const SQL = join(ROOT, 'backup', 'cmarath_db2025.sql')
const OUT = join(__dirname, 'out')

// Attika theme UI-demo pages + WooCommerce pages + stale demo homes to drop.
const EXCLUDE_SLUGS = new Set([
  'accordions', 'buttons', 'checker-box', 'columns', 'countdown', 'counters',
  'dropcaps', 'five-columns-gallery-wide', 'four-columns', 'four-columns-gallery',
  'four-columns-gallery-wide', 'four-columns-wide', 'google-maps', 'headings',
  'highlights', 'image-gallery', 'info-box', 'instagram-list', 'menu-pop-up',
  'pie-chart', 'portfolio-trio', 'product-list', 'progress-bar', 'reservation-pop-up',
  'restaurant-menu', 'section-title', 'separators', 'sample-page', 'contact-form',
  'reservation-form', 'seafood-restaurant',
  'cart', 'cart-2', 'checkout', 'checkout-2', 'my-account', 'shop',
])

const KEEP_CPT = new Set(['restaurant-menu', 'testimonials', 'portfolio-item'])

// --- mysqldump parser (extended inserts, explicit column lists) ---
function parseValues(s, start) {
  const rows = []
  let i = start
  const n = s.length
  while (i < n) {
    while (i < n && (s[i] === ' ' || s[i] === '\n' || s[i] === '\r' || s[i] === ',')) i++
    if (s[i] === ';') { i++; break }
    if (s[i] !== '(') { i++; continue }
    i++
    const row = []
    while (i < n) {
      while (i < n && (s[i] === ' ' || s[i] === '\n' || s[i] === '\r')) i++
      if (s[i] === ')') { i++; break }
      if (s[i] === ',') { i++; continue }
      if (s[i] === "'") {
        i++
        let buf = ''
        while (i < n) {
          const c = s[i]
          if (c === '\\') {
            const nx = s[i + 1]
            const map = { n: '\n', r: '\r', t: '\t', '0': '\0', '\\': '\\', "'": "'", '"': '"', Z: '\x1a' }
            buf += map[nx] !== undefined ? map[nx] : nx
            i += 2
            continue
          }
          if (c === "'") {
            if (s[i + 1] === "'") { buf += "'"; i += 2; continue }
            i++
            break
          }
          buf += c
          i++
        }
        row.push(buf)
      } else {
        let buf = ''
        while (i < n && s[i] !== ',' && s[i] !== ')') { buf += s[i]; i++ }
        buf = buf.trim()
        row.push(buf === 'NULL' ? null : (isNaN(Number(buf)) ? buf : Number(buf)))
      }
    }
    rows.push(row)
  }
  return { rows, next: i }
}

function readTable(sql, table) {
  const marker = `INSERT INTO \`${table}\``
  const out = []
  let from = 0
  for (;;) {
    const idx = sql.indexOf(marker, from)
    if (idx === -1) break
    const open = sql.indexOf('(', idx)
    const close = sql.indexOf(')', open)
    const cols = sql.slice(open + 1, close).split(',').map((c) => c.trim().replace(/`/g, ''))
    const valuesAt = sql.indexOf('VALUES', close)
    const paren = sql.indexOf('(', valuesAt)
    const { rows, next } = parseValues(sql, paren)
    for (const r of rows) {
      const obj = {}
      cols.forEach((c, k) => { obj[c] = r[k] })
      out.push(obj)
    }
    from = next
  }
  return out
}

function main() {
  mkdirSync(OUT, { recursive: true })
  console.log('Reading dump…')
  const sqlUtf = Buffer.from(readFileSync(SQL, 'latin1'), 'latin1').toString('utf8')

  console.log('Parsing tables…')
  const posts = readTable(sqlUtf, 'wp_posts')
  const trans = readTable(sqlUtf, 'wp_icl_translations')
  const meta = readTable(sqlUtf, 'wp_postmeta')
  const options = readTable(sqlUtf, 'wp_options')
  const terms = readTable(sqlUtf, 'wp_terms')
  const termTax = readTable(sqlUtf, 'wp_term_taxonomy')
  const termRel = readTable(sqlUtf, 'wp_term_relationships')

  const byId = new Map(posts.map((p) => [Number(p.ID), p]))

  // attachments + thumbnails
  const attach = new Map()
  const thumb = new Map()
  const metaByPost = new Map()
  for (const m of meta) {
    if (m.meta_key === '_wp_attached_file') attach.set(Number(m.post_id), m.meta_value)
    else if (m.meta_key === '_thumbnail_id') thumb.set(Number(m.post_id), Number(m.meta_value))
    const id = Number(m.post_id)
    if (!metaByPost.has(id)) metaByPost.set(id, {})
    metaByPost.get(id)[m.meta_key] = m.meta_value
  }
  const attachObj = {}
  for (const [k, v] of attach) attachObj[k] = v
  writeFileSync(join(OUT, 'attachments.json'), JSON.stringify(attachObj, null, 2))

  const frontId = Number(options.find((o) => o.option_name === 'page_on_front')?.option_value) || 0
  const blogId = Number(options.find((o) => o.option_name === 'page_for_posts')?.option_value) || 0

  // hierarchical slug path (post_parent chain)
  function pagePath(p) {
    const parts = []
    let cur = p
    let guard = 0
    while (cur && guard++ < 8) {
      parts.unshift(cur.post_name)
      cur = Number(cur.post_parent) > 0 ? byId.get(Number(cur.post_parent)) : null
    }
    return parts.join('/')
  }

  // language per element + trid groups (pages/posts)
  const langOf = new Map()
  const tridMap = new Map()
  for (const t of trans) {
    if (typeof t.element_type === 'string' && t.element_type.startsWith('post_')) {
      langOf.set(Number(t.element_id), t.language_code)
      const g = tridMap.get(t.trid) || {}
      g[t.language_code] = Number(t.element_id)
      tridMap.set(t.trid, g)
    }
  }
  const tridOf = new Map()
  for (const [trid, g] of tridMap) for (const l of Object.keys(g)) tridOf.set(g[l], trid)

  const lang = (id) => langOf.get(Number(id)) || 'el'

  // Unfinished Attika demo pages contain only Latin placeholder text (and demo
  // stock images) with little/no real Greek copy. Detect and drop them.
  function isPlaceholder(content) {
    const s = String(content || '')
    const hasDemo = /lorem ipsum|etiam rhoncus|Main ChefMain Chef|kitchen-content-img|kitchen-img-gallery/i.test(s)
    if (!hasDemo) return false
    const greek = (s.match(/[Ͱ-Ͽἀ-῿]/g) || []).length
    return greek < 200
  }

  // ---- build content groups keyed on the Greek source ----
  const groups = []
  const seen = new Set()

  function buildGroup(elPost, type) {
    const trid = tridOf.get(Number(elPost.ID))
    const g = trid ? tridMap.get(trid) : null
    const enId = g?.en && g.en !== Number(elPost.ID) ? g.en : null
    const en = enId ? byId.get(enId) : null
    const key = trid ? `trid-${trid}` : `id-${elPost.ID}`
    if (seen.has(key)) return null
    seen.add(key)
    const thumbEl = thumb.get(Number(elPost.ID))
    const thumbEn = en ? thumb.get(Number(en.ID)) : undefined
    const isPage = type === 'page' || type === 'home'
    return {
      key,
      type,
      el_id: Number(elPost.ID),
      en_id: en ? Number(en.ID) : null,
      has_en: Boolean(en),
      slug_el: isPage ? pagePath(elPost) : elPost.post_name,
      slug_en: en ? (isPage ? pagePath(en) : en.post_name) : null,
      title_el: elPost.post_title,
      title_en: en?.post_title ?? null,
      excerpt_el: elPost.post_excerpt || null,
      excerpt_en: en?.post_excerpt || null,
      date: elPost.post_date,
      thumb_el: thumbEl ? attach.get(thumbEl) ?? null : null,
      thumb_en: thumbEn ? attach.get(thumbEn) ?? null : null,
      content_el: elPost.post_content,
      content_en: en?.post_content ?? null,
    }
  }

  // pages (Greek source only; EN pulled as twins). Front page -> type 'home'.
  for (const p of posts) {
    if (p.post_type !== 'page' || p.post_status !== 'publish') continue
    if (lang(p.ID) !== 'el') continue
    if (Number(p.ID) === blogId) continue
    const isHome = Number(p.ID) === frontId
    if (!isHome && EXCLUDE_SLUGS.has(p.post_name)) continue
    if (!isHome && isPlaceholder(p.post_content)) continue
    const grp = buildGroup(p, isHome ? 'home' : 'page')
    if (grp) {
      if (isHome) { grp.key = 'home'; grp.slug_el = '' } // Greek home at site root; EN home keeps its real slug
      groups.push(grp)
    }
  }

  // posts (blog) — Greek source
  for (const p of posts) {
    if (p.post_type !== 'post' || p.post_status !== 'publish') continue
    if (lang(p.ID) !== 'el') continue
    const grp = buildGroup(p, 'post')
    if (grp) groups.push(grp)
  }

  // CPTs
  for (const p of posts) {
    if (!KEEP_CPT.has(p.post_type) || p.post_status !== 'publish') continue
    if (lang(p.ID) !== 'el') continue
    const grp = buildGroup(p, p.post_type)
    if (grp) groups.push(grp)
  }

  // ---- navigation menus ----
  const termName = new Map(terms.map((t) => [Number(t.term_id), t.name]))
  const navTax = termTax.filter((t) => t.taxonomy === 'nav_menu')
  const relByTtid = new Map()
  for (const r of termRel) {
    const ttid = Number(r.term_taxonomy_id)
    if (!relByTtid.has(ttid)) relByTtid.set(ttid, [])
    relByTtid.get(ttid).push(Number(r.object_id))
  }

  function hrefForMenuItem(m) {
    if (m._menu_item_type === 'post_type' && m._menu_item_object_id) {
      const target = byId.get(Number(m._menu_item_object_id))
      if (target && target.post_status === 'publish') return '/' + pagePath(target)
    }
    if (m._menu_item_url) {
      const u = String(m._menu_item_url).replace(/https?:\/\/(?:neo\.)?marathiatinos\.gr/i, '').replace(/\/$/, '')
      // only keep custom links that resolve to an included page path
      const slugPath = u.replace(/^\//, '')
      const match = posts.find((p) => p.post_type === 'page' && p.post_status === 'publish' && pagePath(p) === slugPath)
      if (match) return '/' + slugPath
    }
    return null // non-navigating header (dropdown parent)
  }

  function buildMenu(menuName) {
    const tax = navTax.find((t) => termName.get(Number(t.term_id)) === menuName)
    if (!tax) return []
    const ids = relByTtid.get(Number(tax.term_taxonomy_id)) || []
    const items = ids.map((id) => byId.get(id)).filter(Boolean)
      .filter((p) => p.post_status === 'publish')
      .sort((a, b) => Number(a.menu_order) - Number(b.menu_order))
    const nodes = new Map()
    for (const it of items) {
      const m = metaByPost.get(Number(it.ID)) || {}
      const target = m._menu_item_object_id ? byId.get(Number(m._menu_item_object_id)) : null
      nodes.set(Number(it.ID), {
        id: Number(it.ID),
        parent: Number(m._menu_item_menu_item_parent) || 0,
        order: Number(it.menu_order),
        label: (it.post_title || target?.post_title || '').trim(),
        href: hrefForMenuItem(m),
        children: [],
      })
    }
    const roots = []
    for (const node of nodes.values()) {
      if (node.parent && nodes.has(node.parent)) nodes.get(node.parent).children.push(node)
      else roots.push(node)
    }
    const clean = (n) => ({ label: n.label, href: n.href, ...(n.children.length ? { children: n.children.sort((a, b) => a.order - b.order).map(clean) } : {}) })
    return roots.sort((a, b) => a.order - b.order).map(clean)
  }

  const nav = {
    el: buildMenu('Kyrio menou'),
    en: buildMenu('Kyrio menou - Αγγλικά'),
    footer_el: buildMenu('Footer menu'),
    footer_en: buildMenu('Footer menu - Αγγλικά'),
  }
  writeFileSync(join(OUT, 'nav.json'), JSON.stringify(nav, null, 2))

  groups.sort((a, b) => String(a.type).localeCompare(String(b.type)) || String(a.slug_el).localeCompare(String(b.slug_el)))
  writeFileSync(join(OUT, 'content.json'), JSON.stringify(groups, null, 2))

  const byType = {}
  for (const g of groups) byType[g.type] = (byType[g.type] || 0) + 1
  console.log('Groups by type:', byType)
  console.log('With English:', groups.filter((g) => g.has_en).length, '/', groups.length)
  console.log('Nav top-level items (el):', nav.el.length, '| (en):', nav.en.length)
}

main()
