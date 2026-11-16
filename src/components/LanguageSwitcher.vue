<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLocale } from '@/composables/useLocale'
import { pathForKey } from '@/composables/usePages'
import FlagIcon from './FlagIcon.vue'
import type { Locale } from '@/types/content'

const route = useRoute()
const router = useRouter()
const { locale } = useLocale()

// Show only the inactive language's flag; clicking switches to it.
const other = computed<Locale>(() => (locale.value === 'el' ? 'en' : 'el'))
const label = computed(() => (other.value === 'en' ? 'English' : 'Ελληνικά'))

// The twin URL of the current page in the other locale (same clean slug, /en/ prefix).
function pathInLocale(target: Locale): string {
  const pageKey = route.meta.pageKey as string | undefined
  if (pageKey) return pathForKey(pageKey, target) || '/'
  const name = typeof route.name === 'string' ? route.name : ''
  const prefix = target === 'en' ? '/en' : ''
  if (name.startsWith('blog-')) return `${prefix}/blog`
  if (name.startsWith('menu-')) return `${prefix}/menu`
  return prefix || '/'
}

function switchLang() {
  router.push(pathInLocale(other.value))
}
</script>

<template>
  <button
    type="button"
    :aria-label="`Switch language to ${label}`"
    :title="label"
    class="h-4 w-6 overflow-hidden rounded-[2px] ring-1 ring-black/10 opacity-90 transition hover:opacity-100 hover:ring-brand"
    @click="switchLang"
  >
    <FlagIcon :country="other === 'en' ? 'gb' : 'gr'" />
  </button>
</template>
