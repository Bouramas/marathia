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
- **vue-router 4** — lazy views; explicit route per page per locale at clean canonical
  slugs (Greek at root, English under `/en/`); route `meta` drives SEO/robots (see §6).
- **Pinia** — shared state only: `ui` (locale + mobile nav), `toast`,
  `subscriptionForm`. Page-local state stays in component refs.
- **Tailwind CSS v4** — `@theme` tokens in `src/style.css` (`@tailwindcss/vite`).
- **vue-i18n 10** — UI chrome strings only (nav/footer/forms). Page copy lives
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

### Content (pipeline retired)
The WordPress extract/generate/copy-media scripts were removed once the content was ported.
`src/content/*`, `src/site/routes.json` and `public/assets/` are now the **source of truth** and
may be edited directly. `backup/wp_content/uploads/` (git-ignored) is kept only as an image archive.

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

## 5. Content origin (historical)

Content was originally extracted from the WordPress SQL dump (WPBakery + Mikado shortcodes,
WPML `trid` for EN twins, hierarchical slugs, real `Kyrio menou`/`Footer menu` menus) and
transformed into allow-listed HTML in typed modules. The scripts and dump are gone; see git
history for `scripts/{extract-content,generate-content,copy-media}.mjs` if the logic is needed.
Static media lives in `public/assets/` (`uploads/`, `video/hero.mp4`, `hero/`, `logo.png`, `pdf/`).

### Current content counts
home ×1, ~23 pages, 9 menu dishes, 6 testimonials;
26/101 groups have real English.

---

## 6. Routing & SEO

- **URL model:** Greek (default) lives at clean root slugs (`/history`, `/suites/junior`);
  English is prefixed `/en/` (`/en/history`). The locale is encoded by the prefix, not by
  per-WPML slugs. `localePath(base, locale, kind)` in `useLocale.ts` adds the prefix;
  `pathForKey` / `canonicalBase` in `usePages.ts` resolve a content key to its canonical base.
- `src/router/index.ts` builds routes from the content registry (`src/content`):
  `/` and `/en` (home), `/menu` + `/en/menu`, then **one route per
  page per locale at its canonical slug**, and a catch-all 404. The blog was removed (no
  `/blog` routes; old blog URLs show the 404 page). `meta` carries `{ locale, pageKey, noindex }`.
- **Canonical slugs** are hand-authored in `src/site/canonical.json` (`contentKey → clean base slug`).
  `src/site/retired.json` (`retiredKey → targetBase`) lists pages merged into another URL (e.g.
  `i-tinos` → `tinos`); a retired page gets no route, only redirects.
- **Old-URL redirects:** every old WordPress slug (el and en, e.g. `/about/i-istoria-mas`,
  `/about/our-history`) redirects to the new canonical. They are auto-derived at router load from each
  item's `slug.el`/`slug.en` and skipped when the old path already equals a canonical route. These are
  client-side vue-router redirects, **not HTTP 301s** (see limitation below).
- Pages with a dedicated view are mapped by page key in `VIEW_BY_KEY`:
  `forma-kratisis-domatiou` → `ReservationView`, `contact-us` → `ContactView`,
  `biomatika-ergastiria-gia-epangelmaties` → `WorkshopsView`, `seminaria-gastrotourismou` →
  `GastrotourismView`, `symvouleftiki` → `ConsultingView` (copy hand-split verbatim in
  `src/site/services-pages.ts`; edit there),   `i-tinos/me-mia-matia` → `TinosView`, `i-tinos/mi-chasete` → `AttractionsView`, `i-tinos/paralies` → `BeachesView` (copy + placeholder images in `src/site/tinos-pages.ts`), `souites-kai-domatia` → `SuitesView` (guesthouse overview; copy + room data in `src/site/suites-page.ts`), the three room pages (`…/diklina`, `…/superior-diklina-orofou`, `…/junior-suites`) → shared `RoomView` (hero, facts, gallery + lightbox, themed amenities; data in `src/site/room-pages.ts`, components `RoomGallery`/`AmenityGroup`), `about/i-istoria-mas` → `HistoryView` (timeline), `about/i-filosofia-mas` →
  `PhilosophyView` (five principles), `orimansi-psarion` → `MaturationView` (story rows +
  stats + book card). Everything else → `ContentPageView`. The three story pages have
  no hero images (type-only headers; philosophy keeps its arched side image). Their
  copy is hand-split verbatim in `src/site/about-pages.ts` (not generated); edit there.
- Nav/footer are **hand-authored** in `src/site/navigation.ts` (`MENU` + `FOOTER` trees; each leaf
  has a content `key` + `{el,en}` label, hrefs via `pathForKey`), consumed by
  `AppHeader.vue`/`AppFooter.vue`. `src/content/nav.ts` (old DB menus) is no longer imported;
  don't edit it for nav changes.
- **Page transitions:** `App.vue` wraps `RouterView` in `<Transition name="page" mode="out-in">` (fade, classes in `style.css`). `src/router/scroll.ts` defers the scroll reset until the new view is inserted (invisible), so there is no visible scroll jump; hash anchors scroll smoothly. Don't re-add global `scroll-behavior: smooth`. Motion respects `prefers-reduced-motion`.
- `router.afterEach` sets a `robots` meta tag: `index,follow` default;
  `noindex,nofollow` for 404 and **unreviewed English pages** (`enReviewed:false`).
- **Analytics:** Google Tag Manager `GTM-KVFMRB9C` is hard-coded in `index.html` (head + noscript), loaded immediately with no consent banner by decision. The privacy policy (`privacy-policy`, `src/content/pages/privacy-policy.ts`, footer link) discloses it; update it if tags/vendors change. Consider a consent banner for EU ePrivacy compliance.
- `src/composables/useSeo.ts` sets title / description / canonical / hreflang (el+en)
  / Open Graph per view imperatively (origin = `https://marathiatinos.gr`).
- `vite.config.ts` feeds `src/site/routes.json` to `vite-plugin-sitemap` → `dist/sitemap.xml`.

**Known SEO limitation:** this is a client-rendered SPA — meta is set at runtime.
For guaranteed score parity consider prerendering (`vite-ssg`/`vite-plugin-ssr`) and
real server-side **301s** (host config) for old WordPress URLs and the `/en/` scheme; the current
redirects are client-side only. Not done yet.

---

## 7. i18n model (IMPORTANT)

- `src/i18n/index.ts` holds UI chrome strings (el + en). Greek is default.
- Page copy is in the content modules, keyed `{ el, en }`.
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
`booking.*`. Submits via `submitForm` to Web3Forms (env `VITE_WEB3FORMS_KEY`; stub if unset); the notice says the host will contact the guest
to confirm and arrange payment.

**Availability:** flow is guests → categories that fit (`fitsCategory` in `src/site/rooms.ts`) → one specific room → dates. Only that room's public Google Calendar is read live (`src/composables/useAvailability.ts`; rooms, bed layouts and capacity in `src/site/rooms.ts`; env `VITE_GCAL_API_KEY` + 8 `VITE_GCAL_ID_*`). `/booking?room=<id>` preselects a room. **Minimum stay** (`src/site/stay-rules.ts`): Jul–Aug 3 nights; Jun/Sep 1 night Mon–Thu check-in, 2 nights Fri–Sun; enforced in the picker and on submit. Setup and conventions in `Bookings.md`.

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
backup/                 git-ignored image archive: wp_content/uploads only
scripts/
  shot.mjs              headless-Chrome screenshot helper (CDP)
public/
  assets/{uploads,video,hero,pdf}, logo.png
  robots.txt
src/
  main.ts, App.vue, style.css
  router/index.ts
  i18n/index.ts
  stores/{ui,toast,subscriptionForm}.ts
  types/content.ts            the content model
  content/                    pages/*.ts, menu/testimonials/nav/index
  site/routes.json            canonical paths (both locales, for the sitemap)
  site/canonical.json         contentKey → clean base slug (el root, en under /en/)
  site/retired.json           retired page key → target base (redirect only)
  site/navigation.ts          hand-authored MENU + FOOTER trees
  components/ + components/forms/
  composables/{useLocale,useSeo,usePages}.ts
  site/about-pages.ts         hand-authored sections for History/Philosophy/Maturation views
  site/services-pages.ts      hand-authored sections for Workshops/Gastrotourism/Consulting views
  site/tinos-pages.ts         hand-authored sections + entries for Tinos/Attractions/Beaches views (placeholder images in PH)
  views/*.vue                 Home, ContentPage, Menu, Reservation, Contact, History, Philosophy, Maturation, NotFound
```
`src/content/*` and `src/site/routes.json` are now hand-maintained (generator removed).

---

## 11. Gotchas

- `RichText` uses `v-html`, but only on **build-time, allow-listed** output from our
  own pipeline (not user input) — safe. Keep it that way; don't feed it raw shortcode.
- URLs are clean and canonical (`src/site/canonical.json`): Greek at root, English under `/en/`.
  Old WordPress slugs only exist as redirects. Don't reintroduce per-locale WPML slugs as routes.
- To retire/merge a page, add it to `src/site/retired.json` rather than deleting its content.
- New media: copy it into `public/assets/` manually.
- WooCommerce, auth/dashboard, RevSlider, Quform, js_composer are **intentionally
  gone** — don't reintroduce without a scope decision.

---

## 12. Open follow-ups

1. ~~**Homepage layout.**~~ **DONE.** `HomeView` now renders the live multi-section
   layout: a text-only opening (`HomeIntro.vue`, data `homeIntro` in `home-sections.ts`: welcome + "everything Tinos produces" story + History/Philosophy links), then alternating image/text bands (`HomeBand.vue`) driven by hand-authored
   data in `src/site/home-sections.ts` (philosophy, fish aging, services,
   guesthouse, delicacies, seaside), followed by an opening-hours strip, an awards
   strip (`home-sections.ts` `homeAwards`, 7 badges from `public/assets/awards/`, rendered by `AwardsPanel.vue`: cream rounded panel, title left, logos with thin vertical dividers; swipe row on mobile). The latest-news grid was removed from the homepage. Band copy
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
