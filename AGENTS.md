# AGENTS.md — Marathia Tinos (Vue 3 rebuild)

Living doc for humans and AI agents. **Keep it current** — it's the fastest way for
a new session to get full context. If you change the pipeline, routing, or scope,
update the relevant section here in the same change.

---

## 1. What this is

A modern **Vue 3 SPA** rebuild of the bilingual (Greek/English) restaurant +
guesthouse + gastrotourism site **`marathiatinos.gr`** (on Tinos, Cyclades).

The old site is WordPress: commercial **Attika (Qode/Mikado)** theme, page content
authored in **WPBakery Page Builder + Mikado shortcodes**, translated with **WPML**
(Greek is the source language), plus WooCommerce. The rebuild keeps the **brand
identity and copy verbatim**, modernizes the UI, and drops the entire
WordPress/plugin stack (and its CVE surface: RevSlider, js_composer, Duplicator,
code-snippets, Quform).

**The live site is still up at https://marathiatinos.gr/** — use it as the visual +
content source of truth when comparing. The local build should match it.

### Source material: `backup/` (git-ignored, read-only, never redeploy)
- `backup/cmarath_db2025.sql` — full MySQL dump (~57 MB). **This is current**, not
  stale — it contains the live content (verified).
- `backup/wp_content/` — `themes/` (attika + attika-child), `plugins/`, `uploads/`
  (~525 MB media), `languages/` (`el.po/.mo`).
- The backup does **not** include the webroot (`wp-config.php`, `wp-admin/`,
  `wp-includes/`, root `index.php`).

---

## 2. Scope decisions (confirmed with the user — don't silently change)

- **Marketing site only.** WooCommerce (shop/cart/checkout/account) is dropped.
- **Fully public.** No auth, no dashboard, no role guards.
- **Forms are stubbed.** Reservation + Contact have full UI + validation, but submit
  is a no-op/log until a destination is chosen (see §8).
- **Full EN/EL parity is the goal.** Only ~26 of ~101 content groups have a real
  WPML English version today; the rest need professional translation (see §7).

---

## 3. Stack

- **Vue 3.5** (`<script setup>` + TypeScript), **Vite 6**, output to `dist/`.
- **vue-router 4** — lazy views; explicit route per page per locale using real
  slugs; route `meta` drives SEO/robots (see §6).
- **Pinia** — shared state only: `ui` (locale + mobile nav), `toast`,
  `subscriptionForm`. Page-local state stays in component refs.
- **Tailwind CSS v4** — `@theme` tokens in `src/style.css` (`@tailwindcss/vite`).
- **vue-i18n 10** — UI chrome strings only (nav/footer/forms). Page/post copy lives
  in typed content modules, not i18n files.
- **@fontsource** self-hosted Open Sans + Karla (no Google Fonts CDN → GDPR).
- **vite-plugin-sitemap** + `public/robots.txt`.
- **@types/node** is needed for `vite.config.ts` / the `.mjs` scripts.

---

## 4. Commands

| Command | What |
|---|---|
| `npm run dev` | Vite dev server |
| `npm run build` | **BUILD GATE**: `vue-tsc -b && vite build`. Must pass (zero TS errors). |
| `npm run typecheck` | `vue-tsc` only |
| `npm run preview` | Serve `dist/` (prints the port, usually 4173) |
| `npm run extract` | = `node scripts/extract-content.mjs` |

### Content pipeline (run in order after any content/mapping change)
```
node scripts/extract-content.mjs    # SQL dump -> scripts/out/{content,nav,attachments}.json
node scripts/generate-content.mjs   # raw JSON -> src/content/*.ts + src/site/routes.json + scripts/out/used-media.json
node scripts/copy-media.mjs         # referenced uploads + video/poster/pdfs -> public/assets/
npm run build                       # gate
```
`scripts/out/` is git-ignored (regenerable). `src/content/*` IS committed.

### Visual verification (headless Chrome is available on this machine)
```
npm run preview &                                   # note the port
node scripts/shot.mjs <url> <out.png> [w] [h] [scrollY]
# desktop:  node scripts/shot.mjs http://localhost:4173/ /tmp/home.png 1440 2000
# mobile:   node scripts/shot.mjs http://localhost:4173/ /tmp/m.png 390 844
```
Then Read the PNG. **Gotcha:** Chrome on macOS has a ~500px min *window* width, so
plain `--window-size=390` crops; `scripts/shot.mjs` uses CDP
`Emulation.setDeviceMetricsOverride`, which actually reflows. Compare against the
live `marathiatinos.gr` (WebFetch the live page for its structure/copy).

---

## 5. The content pipeline in detail (how mapping works — read before touching it)

WordPress facts established from the dump (table prefix `wp_`):
- **Front page** = `wp_options.page_on_front` → **ID 81** (`marathia-tinos`, title
  "Αρχικη"), a ~38 KB WPBakery page. This is the HOMEPAGE, served at `/`
  (content key `home`). It is NOT a generic page — don't miss it.
- **Blog page** = `page_for_posts` → ID 1662 (handled by `BlogListView`, not ported
  as content).
- **Permalinks** = `/%postname%/`; pages are hierarchical via `post_parent`, so real
  URLs are nested: `about/i-filosofia-mas`, `i-tinos/me-mia-matia`,
  `souites-kai-domatia/diklina`. **Slugs must be the full hierarchical path.**
- **WPML**: Greek (`el`) is source/default; English pages are **separate posts with
  their own real slugs** (`about/our-philosophy`), linked to the Greek source via
  `wp_icl_translations.trid`. There is **no `/en/` URL prefix** — the slug encodes
  the language.
- Content is **WPBakery + Mikado shortcodes** (no ACF, not Gutenberg).
- Menus live in `wp_terms`/`wp_term_taxonomy` (`nav_menu`): primary = **`Kyrio menou`**
  (+ `Kyrio menou - Αγγλικά`), footer = **`Footer menu`** (+ `- Αγγλικά`). Menu item
  targets/order are in `nav_menu_item` posts + `_menu_item_*` postmeta.

### `scripts/extract-content.mjs`
Hand-rolled mysqldump parser (extended inserts, explicit column lists). Reads the
file as **`latin1` then re-decodes to UTF-8** so Greek survives — do not "fix" this.
Outputs to `scripts/out/`:
- `content.json` — one entry per Greek source page/post/CPT, with its EN twin pulled
  via `trid`, hierarchical `slug_el`/`slug_en`, titles, excerpts, featured image,
  raw `content_el`/`content_en`.
- `nav.json` — real `Kyrio menou` + `Footer menu` (el + en), hierarchical hrefs.
- `attachments.json` — attachment ID → uploads-relative path.

**Exclusions** (so only real content ships):
- `EXCLUDE_SLUGS` — Attika UI-demo pages (accordions, buttons, columns, headings,
  info-box, pie-chart, …) + WooCommerce (cart/checkout/shop/my-account) + stale demo
  homes (seafood-restaurant).
- `isPlaceholder()` — auto-drops unfinished pages whose body is Latin filler
  (`lorem ipsum`/`etiam rhoncus`/`Main ChefMain Chef`/demo `kitchen-*` images) with
  **< 200 Greek chars** (e.g. astrea-wine-bar, i-omada, chrisima-2 were all stubs).

### `scripts/generate-content.mjs`
Transforms `content.json` → typed modules under `src/content/`. `clean()` turns
shortcode markup into **allow-listed HTML**: `mkdf_section_title text=` → `<h2>`,
`(vc|mkdf)_single_image image=ID` → `<figure><img>` (resolved via attachments),
strips all other shortcodes + `style`/`class` attrs, rewrites internal links/image
URLs to local paths, and **drops leftover `Lorem ipsum` blocks**. Emits:
`src/content/pages/*.ts`, `menu.ts`, `testimonials.ts`, `portfolio.ts`, `nav.ts`,
`index.ts`, plus `src/site/routes.json` and `scripts/out/used-media.json`.

### `scripts/copy-media.mjs`
Copies only the uploads referenced by ported content (from `used-media.json`,
currently ~139 files, not the full 525 MB) into `public/assets/uploads/`, plus:
- `public/assets/video/hero.mp4` (home hero video — original `uploads/2018/08/Sequence-1.mp4`)
- `public/assets/hero/poster.jpg`, `hero/dining.jpg`
- `public/assets/logo.png`
- `public/assets/pdf/menu-2024.pdf`, `programma-gastrotourismou-tinos.pdf` (PDF
  names sanitized from mojibake).

### Current content counts
home ×1, ~23 pages, 12 posts, 9 menu dishes, 6 testimonials, 51 portfolio items;
26/101 groups have real English.

---

## 6. Routing & SEO

- `src/router/index.ts` builds routes from the content registry (`src/content`):
  `/` (home, el), the EN home at its own slug if present, then **one route per page
  per locale at its real hierarchical slug** (el always; en only when `slug.en !==
  slug.el`), `/blog`, `/blog/:slug` per post, `/menu`, and a catch-all 404.
  `meta` carries `{ locale, pageKey, noindex }`.
- Pages with a dedicated view are mapped by page key in `VIEW_BY_KEY`:
  `forma-kratisis-domatiou` → `ReservationView`, `contact-us` → `ContactView`,
  `biomatika-ergastiria-gia-epangelmaties` → `WorkshopsView`, `seminaria-gastrotourismou` →
  `GastrotourismView`, `symvouleftiki` → `ConsultingView` (copy hand-split verbatim in
  `src/site/services-pages.ts`; edit there),   `i-tinos/me-mia-matia` → `TinosView`, `i-tinos/mi-chasete` → `AttractionsView`, `i-tinos/paralies` → `BeachesView` (copy + placeholder images in `src/site/tinos-pages.ts`), `about/i-istoria-mas` → `HistoryView` (timeline), `about/i-filosofia-mas` →
  `PhilosophyView` (five principles), `orimansi-psarion` → `MaturationView` (story rows +
  stats + book card). Everything else → `ContentPageView`. The three story pages have
  no hero images (type-only headers; philosophy keeps its arched side image). Their
  copy is hand-split verbatim in `src/site/about-pages.ts` (not generated); edit there.
- Nav/footer are the **real DB menus** via `src/content/nav.ts` (consumed by
  `AppHeader.vue`/`AppFooter.vue`). Top-level items with children that don't resolve
  to a page are non-navigating dropdown headers (matches the live site).
- `router.afterEach` sets a `robots` meta tag: `index,follow` default;
  `noindex,nofollow` for 404 and **unreviewed English pages** (`enReviewed:false`).
- `src/composables/useSeo.ts` sets title / description / canonical / hreflang (el+en)
  / Open Graph per view imperatively (origin = `https://marathiatinos.gr`).
- `vite.config.ts` feeds `src/site/routes.json` to `vite-plugin-sitemap` → `dist/sitemap.xml`.

**Known SEO limitation:** this is a client-rendered SPA — meta is set at runtime.
For guaranteed score parity consider prerendering (`vite-ssg`/`vite-plugin-ssr`) and
server-side **301s** for any URL that changed. Not done yet.

---

## 7. i18n model (IMPORTANT)

- `src/i18n/index.ts` holds UI chrome strings (el + en). Greek is default.
- Page/post copy is in the content modules, keyed `{ el, en }`.
- **`enReviewed`**: `true` only when a real WPML English page existed. For pages that
  were Greek-only, the generator stores the Greek text as the `en` value with
  `enReviewed:false` — a **fallback, not a translation**. `DraftTranslationNotice.vue`
  surfaces these in **dev only**; they're never shown to visitors as finished English,
  and their EN routes are `noindex`.
- **Open content task (not code):** professionally translate every item with
  `enReviewed:false`, update the content module, flip the flag.

---

## 8. Forms (STUBBED)

**Contact page** (`ContactView.vue`) is hand-authored, with no form: details card + `BrandMap.vue`
(plain keyless Google Maps embed iframe; no API key by decision). The page has no PageHeader; the
DotSeparator sits at the end. Copy lives in i18n `contact.*`.
`ContactForm.vue` is now unused.

**Booking page** (`/booking`, key `forma-kratisis-domatiou`, `ReservationView.vue` + `forms/ReservationForm.vue`)
is a guesthouse booking *request* UI: custom range calendar `forms/DateRangePicker.vue` (no deps, el/en via
`Intl`), guests steppers, room preference, details, consent, summary aside, thank-you panel. Copy in i18n
`booking.*`. Still stubbed (`BookingPayload` → `submitForm`); the notice says the host will contact the guest
to confirm and arrange payment.

`src/stores/subscriptionForm.ts` → `submitForm(payload, endpoint?)`. With no
`endpoint` it logs + simulates success (shows a success toast). `ReservationForm.vue`
+ `ContactForm.vue` have full fields + validation. **TODO:** pick a destination
(3rd-party form service like Formspree, or an API endpoint) and pass its URL; that's
the only seam to wire.

---

## 9. Design system (brand carried from the old theme)

`src/style.css` `@theme` tokens (source: `themes/attika/assets/css/style_dynamic.css`,
`wp_options.mkdf_options_attika`, `uploads/custom-css-js/3428.css`):
- Primary accent **logo gold `#c9a15b`** (`--color-brand`); warm creams (`#faf5f0`
  `--color-cream` …); page bg `#f5f7f8`; footer `#eaeaea`; link `#0061ba`; rule `#a1a1a1`.
- Fonts: **Open Sans** (body/headings) + **Karla** (`.label-kicker` — wide-tracked
  uppercase overline labels).
- `@utility display` — uppercase display heading. Applied **explicitly** to
  hero/section/page titles ONLY (not global `h1–h3`, or Greek body copy renders
  broken). Letter-spacing is set per-title with `tracking-*` utilities and tightened
  on small screens (wide tracking overflows mobile).
- `.section-rule` — short centered divider above section titles.
- `.prose-marathia` — styles for `RichText`-rendered body HTML.

Components: `HeroSection` (background video + poster, replaces RevSlider; home only),
`HomeBand` (alternating image/text teaser band for the homepage; data in
`src/site/home-sections.ts`), `PageHeader` (other pages), `SectionTitle`, `RichText` (`v-html` of sanitized body),
`BaseButton`, `ToastHost`, `FlagIcon` (inline SVG GR/GB), `LanguageSwitcher` (flag
buttons, active locale ringed gold, jumps to the twin slug), `AppHeader` (desktop
hover dropdowns / mobile accordion, hamburger below `xl`), `AppFooter`,
`DraftTranslationNotice`, `forms/BaseInput`. `App.vue` root has `overflow-x-hidden`
as a safety against stray horizontal scroll.

---

## 10. Project layout

```
backup/                 WP source (git-ignored): SQL dump + wp_content
scripts/
  extract-content.mjs   SQL dump -> scripts/out/*.json
  generate-content.mjs  raw JSON -> src/content/*.ts + routes.json
  copy-media.mjs        referenced uploads + video/pdfs -> public/assets
  shot.mjs              headless-Chrome screenshot helper (CDP)
  out/                  generated intermediates (git-ignored)
public/
  assets/{uploads,video,hero,pdf}, logo.png
  robots.txt
src/
  main.ts, App.vue, style.css
  router/index.ts
  i18n/index.ts
  stores/{ui,toast,subscriptionForm}.ts
  types/content.ts            the content model
  content/                    AUTO-GENERATED — pages/*.ts, menu/testimonials/portfolio/nav/index
  site/routes.json            AUTO-GENERATED canonical paths (both locales)
  components/ + components/forms/
  composables/{useLocale,useSeo,usePages}.ts
  site/about-pages.ts         hand-authored sections for History/Philosophy/Maturation views
  site/services-pages.ts      hand-authored sections for Workshops/Gastrotourism/Consulting views
  site/tinos-pages.ts         hand-authored sections + entries for Tinos/Attractions/Beaches views (placeholder images in PH)
  views/*.vue                 Home, ContentPage, BlogList, Post, Menu, Reservation, Contact, History, Philosophy, Maturation, NotFound
```
**Do not hand-edit `src/content/*` or `src/site/routes.json`** — change the generator
or the extractor and re-run the pipeline. (Curate the *source* copy downstream only
if you also keep the generator idempotent.)

---

## 11. Gotchas

- SQL dump is UTF-8 stored as bytes; extractor reads `latin1` then re-decodes. Don't change.
- `RichText` uses `v-html`, but only on **build-time, allow-listed** output from our
  own pipeline (not user input) — safe. Keep it that way; don't feed it raw shortcode.
- Slugs are hierarchical — never flatten; it breaks URL/SEO parity with the live site.
- No `/en` prefix — English pages have their own real slugs via WPML `trid`.
- Re-run `copy-media.mjs` after `generate-content.mjs` whenever referenced media changes.
- WooCommerce, auth/dashboard, RevSlider, Quform, js_composer are **intentionally
  gone** — don't reintroduce without a scope decision.

---

## 12. Open follow-ups

1. ~~**Homepage layout.**~~ **DONE.** `HomeView` now renders the live multi-section
   layout: a text-only opening (`HomeIntro.vue`, data `homeIntro` in `home-sections.ts`: welcome + "everything Tinos produces" story + History/Philosophy links), then alternating image/text bands (`HomeBand.vue`) driven by hand-authored
   data in `src/site/home-sections.ts` (philosophy, fish aging, services,
   guesthouse, delicacies, seaside), followed by an opening-hours strip, an awards
   strip (`home-sections.ts` `homeAwards`, 5 original badges from `public/assets/awards/`, rendered by `AwardsPanel.vue`: cream rounded panel, title left, logos with thin vertical dividers; swipe row on mobile). The latest-news grid was removed from the homepage. Band copy
   is verbatim teaser text sliced from the `home` content body (both locales
   `enReviewed:true`); each band's CTA links to a content key via `pathForKey`. New
   i18n keys live under `home.*` in `src/i18n/index.ts`. The raw `home` body in
   `src/content/pages/home.ts` is no longer rendered (SEO description still reads from
   it). Tune copy/images/order in `home-sections.ts`, not the generated content.
2. **English translations** for all `enReviewed:false` items (content work).
3. **Forms endpoint** (§8).
4. **Prerender + 301s** for full SEO parity (§6).
5. **Media pruning vs archive** — currently prune-to-referenced; full 525 MB archive
   is not copied.

---

## 13. Security note

The original brief claimed the backup contained webshells. A scan of this backup
(`wp_content/` + SQL) found **none** — only legitimate plugin artifacts that commonly
trigger scanner false-positives. The backup does **not** include the webroot (the
likely webshell location) — scan that separately if it exists. Rotate all
WordPress/DB/hosting credentials regardless. The rebuild carries over **no PHP**.
