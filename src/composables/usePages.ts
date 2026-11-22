import { allContent, pages, home } from '@/content'
import type { Locale, PageContent } from '@/types/content'
import { localePath } from '@/composables/useLocale'
import canonical from '@/site/canonical.json'

const byKey = new Map(allContent.map((p) => [p.key, p]))

/** Clean canonical base slug per content key (hand-authored, not the WP slug). */
const CANON = canonical as Record<string, string>

export function pageByKey(key: string): PageContent | undefined {
  return byKey.get(key)
}

/** Canonical base slug for a content item (falls back to its WP el-slug). */
export function canonicalBase(page: PageContent): string {
  return CANON[page.key] ?? page.slug.el
}

/** Route path for a content item by key, in the given locale (el default, /en/ for en). */
export function pathForKey(key: string, locale: Locale): string | undefined {
  if (key === 'home') return localePath('', locale)
  const p = byKey.get(key)
  if (!p) return undefined
  return localePath(canonicalBase(p), locale)
}

export { pages, home, allContent }
