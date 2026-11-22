<script setup lang="ts">
// One themed amenity group: line icon, title and a list with gold dashes.
import type { AmenityIcon } from '@/site/room-pages'

defineProps<{ icon: AmenityIcon; title: string; items: string[]; index: number }>()

const PATHS: Record<AmenityIcon, string> = {
  bed: 'M3 18V7m0 7h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5M7 11.5h.01',
  cup: 'M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V8Zm11 1.5h1.5a2.5 2.5 0 0 1 0 5H16M8 3.5c0 1 1 1 1 2M12 3.5c0 1 1 1 1 2',
  leaf: 'M5 19c0-8 5-13 14-14 0 9-5 14-13 14m-1 1c1-5 4-8 8-10',
  bell: 'M3 17h18M5 17a7 7 0 0 1 14 0M12 7V5m-2 0h4',
}
</script>

<template>
  <div class="px-0 py-8 sm:px-8 lg:py-10">
    <div class="flex items-center gap-4">
      <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-brand/60 text-brand">
        <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path :d="PATHS[icon]" />
        </svg>
      </span>
      <div>
        <p class="label-kicker text-brand">{{ String(index + 1).padStart(2, '0') }}</p>
        <h3 class="text-xl font-semibold tracking-wide text-ink">{{ title }}</h3>
      </div>
    </div>
    <ul class="mt-6 space-y-3 text-ink/80">
      <li v-for="item in items" :key="item" class="flex gap-3 leading-snug">
        <span class="mt-[0.6em] block h-px w-4 shrink-0 bg-brand"></span>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
