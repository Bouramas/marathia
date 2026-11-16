import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUiStore } from '@/stores/ui'
import type { Localized, Locale } from '@/types/content'

// Convenience access to the active locale + a localized-value picker with el fallback.
export function useLocale() {
  const ui = useUiStore()
  const { locale } = storeToRefs(ui)

  function pick<T>(value: Localized<T>): T {
    return value[locale.value] ?? value.el
  }

  const isEl = computed(() => locale.value === 'el')

  return { locale, isEl, pick }
}

/**
 * Build a route path from a canonical base slug. Greek (default) lives at the
 * clean root slug ("/history"); English is prefixed with "/en/" ("/en/history").
 * The empty base is the home page ("/" el, "/en" en). Posts live under /blog/.
 */
export function localePath(base: string, locale: Locale, kind: 'page' | 'post' = 'page'): string {
  const prefix = locale === 'en' ? '/en' : ''
  if (kind === 'post') return `${prefix}/blog/${base}`
  if (base === '') return prefix || '/'
  return `${prefix}/${base}`
}
