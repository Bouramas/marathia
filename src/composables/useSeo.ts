import { watchEffect } from 'vue'
import type { Locale } from '@/types/content'

const SITE_NAME = 'Marathia Tinos'
const ORIGIN = 'https://marathiatinos.gr'

interface SeoInput {
  title: string
  description?: string
  locale: Locale
  /** Path for the current locale (for canonical). */
  path: string
  /** Alternate-language path for hreflang, if the page exists in the other language. */
  altPath?: string
  altLocale?: Locale
  image?: string
}

function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const sel = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`
  let el = document.head.querySelector(sel) as HTMLLinkElement | null
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

// Imperatively manage document head for SEO parity with the old Yoast setup:
// title, description, canonical, hreflang alternates, Open Graph.
export function useSeo(input: () => SeoInput) {
  watchEffect(() => {
    const s = input()
    const fullTitle = `${s.title} — ${SITE_NAME}`
    document.title = fullTitle
    document.documentElement.setAttribute('lang', s.locale)

    if (s.description) upsertMeta('meta[name="description"]', { name: 'description', content: s.description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle })
    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' })
    upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: SITE_NAME })
    if (s.description) upsertMeta('meta[property="og:description"]', { property: 'og:description', content: s.description })
    if (s.image) upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ORIGIN + s.image })

    upsertLink('canonical', ORIGIN + s.path)
    upsertLink('alternate', ORIGIN + s.path, s.locale)
    if (s.altPath && s.altLocale) {
      upsertLink('alternate', ORIGIN + s.altPath, s.altLocale)
      upsertLink('alternate', ORIGIN + (s.locale === 'el' ? s.path : s.altPath), 'x-default')
    }
  })
}

export { SITE_NAME, ORIGIN }
