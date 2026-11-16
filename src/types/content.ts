// Typed content model for the migrated WordPress content.
//
// Page/post bodies are stored as sanitized HTML strings (rendered through the
// RichText component) rather than inline in templates, so the long Greek/English
// copy stays easy to diff and the types catch malformed content at build time.

export type Locale = 'el' | 'en'

/** A value that exists in both site languages. */
export interface Localized<T = string> {
  el: T
  en: T
}

export type ContentType = 'home' | 'page' | 'post' | 'menu' | 'testimonial' | 'portfolio'

export interface Seo {
  title: Localized
  description: Localized
}

export interface Hero {
  /** /assets-relative image path, or undefined for a plain page header. */
  image?: string
  kicker?: Localized
}

export interface PageContent {
  /** Stable key, unique across all content. */
  key: string
  type: ContentType
  /** URL slug per locale (ASCII greeklish, carried over from WP for SEO). */
  slug: Localized
  title: Localized
  excerpt?: Localized
  hero?: Hero
  /** Sanitized HTML body per locale. */
  body: Localized
  /** ISO date for posts. */
  date?: string
  seo: Seo
  /**
   * false = the English copy is a Greek fallback awaiting professional
   * translation (the page had no WPML English version). Surfaced in dev and in
   * AGENTS.md so these are tracked, never silently shipped as "translated".
   */
  enReviewed: boolean
}

export interface MenuDish {
  key: string
  slug: Localized
  title: Localized
  body: Localized
  image?: string
  enReviewed: boolean
}

export interface Testimonial {
  key: string
  title: Localized
  body: Localized
}
