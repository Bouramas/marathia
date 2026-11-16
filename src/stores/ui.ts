import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Locale } from '@/types/content'
import { DEFAULT_LOCALE, setLocale as applyLocale } from '@/i18n'

// Shared UI state: current locale + mobile-nav open state.
export const useUiStore = defineStore('ui', () => {
  const locale = ref<Locale>(DEFAULT_LOCALE)
  const mobileNavOpen = ref(false)

  function setLocale(next: Locale) {
    locale.value = next
    applyLocale(next)
  }

  function toggleMobileNav(open?: boolean) {
    mobileNavOpen.value = open ?? !mobileNavOpen.value
  }

  return { locale, mobileNavOpen, setLocale, toggleMobileNav }
})
