# Marathia Tinos

Vue 3 rebuild of [marathiatinos.gr](https://marathiatinos.gr/), the bilingual (Greek/English) site of a restaurant, guesthouse and gastrotourism business on Tinos, Cyclades.

The original site runs on WordPress (Attika theme, WPBakery, WPML, WooCommerce). This project keeps the brand identity and copy verbatim, modernizes the UI, and removes the WordPress/plugin stack and its vulnerabilities. The live site remains the visual and content reference.

## Scope

- Marketing site only. No shop, cart, checkout, accounts or auth.
- Fully public.
- Reservation and contact forms have full UI and validation, but submission is stubbed until a destination is chosen.
- Goal is full EN/EL parity. Most pages still have only a Greek source; English fallbacks are marked `enReviewed: false` and are `noindex`.

## Stack

- Vue 3.5 (`<script setup>`, TypeScript), Vite 6
- vue-router 4, Pinia, vue-i18n 10
- Tailwind CSS v4 (tokens in `src/style.css`)
- Self-hosted fonts via `@fontsource` (no Google Fonts CDN, for GDPR)
- `vite-plugin-sitemap` for `sitemap.xml`

## Getting started

```
npm install
npm run dev
```

| Command | Purpose |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Typecheck (`vue-tsc -b`) and build to `dist/`. Must pass. |
| `npm run typecheck` | Typecheck only |
| `npm run preview` | Serve `dist/` (usually port 4173) |

Screenshots (headless Chrome):

```
npm run preview &
node scripts/shot.mjs http://localhost:4173/ out.png 1440 2000
```

## Environment variables

Booking availability reads public Google Calendars (see [Bookings.md](Bookings.md)):

- `VITE_GCAL_API_KEY`
- `VITE_GCAL_ID_STANDARD_1..3`, `VITE_GCAL_ID_SUPERIOR_1..2`, `VITE_GCAL_ID_JUNIOR_1..3`

If missing, rooms are treated as free and no dates are blocked.

## Project layout

```
public/assets/     images, video, PDFs, logo (copy new media here manually)
scripts/shot.mjs   screenshot helper
src/
  content/         typed page/post/menu/testimonial content (source of truth)
  site/            hand-authored page data (home sections, rooms, about, services, Tinos)
  site/routes.json canonical paths for both locales (sitemap)
  site/canonical.json, retired.json, navigation.ts   URL slugs, merged pages, menus
  router/          routes built from the content registry
  i18n/            UI chrome strings (nav, footer, forms)
  stores/          ui, toast, subscriptionForm
  composables/     useSeo, useLocale, usePages, useAvailability
  components/      shared and form components
  views/           page views
backup/            git-ignored archive of WordPress uploads (read-only)
```

## Key concepts

- **Content:** page copy lives in typed modules under `src/content`, keyed `{ el, en }`. The WordPress extraction scripts were retired; edit content directly.
- **Routing:** clean canonical URLs, defined in `src/site/canonical.json`. Greek is at the root (`/history`), English is prefixed with `/en/` (`/en/history`). Old WordPress slugs (both locales) redirect to the canonical URL; retired/merged pages are listed in `src/site/retired.json`. These redirects are client-side, so real HTTP 301s still need host configuration. Pages with custom layouts are mapped in `VIEW_BY_KEY` in the router; others use `ContentPageView`.
- **Navigation:** hand-authored in `src/site/navigation.ts`.
- **SEO:** `useSeo` sets title, description, canonical, hreflang and Open Graph at runtime; the router sets the `robots` meta.
- **Booking:** guests choose a room category, then see availability from Google Calendar. A night is blocked only when all rooms in the category are booked. Requests are not yet sent anywhere.

## Open work

1. Professional English translations for all `enReviewed: false` content.
2. Choose and wire a forms endpoint (`submitForm` in `src/stores/subscriptionForm.ts`).
3. Prerendering and real server-side 301 redirects (old WordPress URLs to the new canonical and `/en/` URLs) for full SEO parity. The site is currently a client-rendered SPA with client-side redirects only.
4. Media pruning versus the full image archive.

See [TODO.md](TODO.md) for current tasks.

## Further reading

[AGENTS.md](AGENTS.md) is the detailed living doc (design system, routing, i18n model, gotchas). Keep it updated when the pipeline, routing or scope changes.
