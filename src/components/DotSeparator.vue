<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Row of dots echoing the logo: random sizes, slight wave, drifting gently on scroll.
const COUNT = 10
const rnd = (min: number, max: number) => min + Math.random() * (max - min)

const dots = Array.from({ length: COUNT }, (_, i) => ({
  x: 10 + (i * 480) / (COUNT - 1),
  baseY: 18 + Math.sin(i * 0.9) * 5,
  r: rnd(4, 7),
  amp: rnd(1.5, 4),
  phase: rnd(0, Math.PI * 2),
  speed: rnd(0.004, 0.009),
}))

const offsets = ref<number[]>(dots.map(() => 0))
let frame = 0

function update() {
  frame = 0
  const y = window.scrollY
  offsets.value = dots.map((d) => Math.sin(y * d.speed + d.phase) * d.amp)
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(update)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  if (frame) cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="flex justify-center px-6 py-10 text-brand lg:py-14" aria-hidden="true">
    <svg viewBox="0 0 500 36" class="h-9 w-full max-w-md overflow-visible" fill="currentColor">
      <circle
        v-for="(d, i) in dots"
        :key="i"
        :cx="d.x"
        :cy="d.baseY + offsets[i]"
        :r="d.r"
      />
    </svg>
  </div>
</template>
