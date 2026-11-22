<script setup lang="ts">
// Bento photo grid with a lightbox. First photo is large; the grid is 2 columns on
// mobile and 3 from md. Lightbox: Esc closes, arrows navigate, buttons for touch.
import { computed, onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{
  images: { src: string; alt: string }[]
  labels: { open: string; close: string; prev: string; next: string }
}>()

const current = ref<number | null>(null)
const isOpen = computed(() => current.value !== null)
// On mobile an odd remainder would leave the last tile alone; let it span the row.
const lastSpansMobile = computed(() => (props.images.length - 1) % 2 === 1)

function step(d: number) {
  if (current.value === null) return
  current.value = (current.value + d + props.images.length) % props.images.length
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') current.value = null
  else if (e.key === 'ArrowRight') step(1)
  else if (e.key === 'ArrowLeft') step(-1)
}

watch(isOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <div class="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3">
    <button
      v-for="(img, i) in images"
      :key="img.src"
      type="button"
      class="group relative cursor-zoom-in overflow-hidden rounded-sm bg-cream"
      :class="[
        i === 0 ? 'col-span-2 aspect-[4/3] md:row-span-2 md:aspect-auto' : 'aspect-square md:aspect-[4/3]',
        lastSpansMobile && i === images.length - 1 ? 'max-md:col-span-2 max-md:aspect-[2/1]' : '',
      ]"
      :aria-label="`${labels.open}: ${img.alt}`"
      @click="current = i"
    >
      <img
        :src="img.src"
        :alt="img.alt"
        :loading="i < 2 ? 'eager' : 'lazy'"
        class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />
    </button>
  </div>

  <Teleport to="body">
    <div
      v-if="current !== null"
      class="fixed inset-0 z-[100] flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      @click.self="current = null"
    >
      <div class="flex items-center justify-between px-5 py-4 text-white/80">
        <span class="label-kicker">{{ current + 1 }} / {{ images.length }}</span>
        <button type="button" class="label-kicker cursor-pointer px-2 py-1 hover:text-white" @click="current = null">
          {{ labels.close }} &times;
        </button>
      </div>
      <div class="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-16" @click.self="current = null">
        <button
          type="button"
          class="absolute left-1 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-black/40 text-2xl text-white hover:bg-black/70 sm:left-4"
          :aria-label="labels.prev"
          @click="step(-1)"
        >&lsaquo;</button>
        <img :src="images[current].src" :alt="images[current].alt" class="max-h-full max-w-full object-contain" />
        <button
          type="button"
          class="absolute right-1 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-black/40 text-2xl text-white hover:bg-black/70 sm:right-4"
          :aria-label="labels.next"
          @click="step(1)"
        >&rsaquo;</button>
      </div>
      <p class="px-6 py-4 text-center text-sm text-white/80">{{ images[current].alt }}</p>
    </div>
  </Teleport>
</template>
