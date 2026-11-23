<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
defineProps<{ awards: string[] }>()
const { t } = useI18n()

const viewport = ref<HTMLElement | null>(null)
const track = ref<HTMLElement | null>(null)

const SPEED = 22 // px per second
const RESUME_DELAY = 1500 // ms after the user lets go

let raf = 0
let last = 0
let pos = 0
let setWidth = 0
let touching = false
let visible = true
let resumeTimer = 0
let mq: MediaQueryList | null = null
let reduced = false
let ro: ResizeObserver | null = null
let io: IntersectionObserver | null = null

function measure() {
  const vp = viewport.value
  const tr = track.value
  if (!vp || !tr) return
  const w = tr.scrollWidth / 3
  if (!w) return
  const firstRun = setWidth === 0
  setWidth = w
  if (firstRun) {
    vp.scrollLeft = setWidth // start on the middle copy, a whole logo at the left edge
    pos = vp.scrollLeft
  }
}

function wrap() {
  const vp = viewport.value
  if (!vp || !setWidth) return
  if (vp.scrollLeft >= setWidth * 2) vp.scrollLeft -= setWidth
  else if (vp.scrollLeft <= 0) vp.scrollLeft += setWidth
}

function onScroll() {
  wrap()
}

function tick(now: number) {
  raf = requestAnimationFrame(tick)
  const vp = viewport.value
  const dt = Math.min(now - last, 64)
  last = now
  if (!vp || !setWidth || touching || !visible || reduced) return
  pos += (SPEED * dt) / 1000
  vp.scrollLeft = pos
  wrap()
  // browsers round scrollLeft; only resync after a wrap so the float accumulator keeps sub-pixel progress
  if (pos >= setWidth * 2) pos -= setWidth
}

function hold() {
  touching = true
  clearTimeout(resumeTimer)
}
function release() {
  clearTimeout(resumeTimer)
  resumeTimer = window.setTimeout(() => {
    touching = false
    if (viewport.value) pos = viewport.value.scrollLeft
  }, RESUME_DELAY)
}

function start() {
  if (raf) return
  last = performance.now()
  raf = requestAnimationFrame(tick)
}
function stop() {
  cancelAnimationFrame(raf)
  raf = 0
}

onMounted(() => {
  const vp = viewport.value
  if (!vp) return
  mq = window.matchMedia('(max-width: 1023px)')
  reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!mq.matches) return
  measure()
  vp.addEventListener('scroll', onScroll, { passive: true })
  vp.addEventListener('touchstart', hold, { passive: true })
  vp.addEventListener('touchend', release, { passive: true })
  vp.addEventListener('touchcancel', release, { passive: true })
  vp.addEventListener('pointerdown', hold, { passive: true })
  vp.addEventListener('pointerup', release, { passive: true })
  vp.addEventListener('wheel', () => { hold(); release() }, { passive: true })
  ro = new ResizeObserver(measure)
  ro.observe(track.value!)
  // images load lazily, so widths settle after mount
  track.value!.querySelectorAll('img').forEach((img) => img.addEventListener('load', measure))
  io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
  io.observe(vp)
  start()
})

onBeforeUnmount(() => {
  stop()
  clearTimeout(resumeTimer)
  ro?.disconnect()
  io?.disconnect()
})
</script>

<!-- Variant B: warm cream panel, title above, logos below separated by thin vertical rules.
     Below lg the panel is full-bleed; logos auto-drift and can be swiped, in an endless loop
     (set is rendered 3x, scroll position wraps by one set width). -->
<template>
  <section class="py-12 lg:py-20">
    <div class="mx-auto max-w-7xl lg:px-10">
      <div class="bg-cream py-12 lg:rounded-3xl lg:px-10 lg:py-14">
        <header class="mb-10 px-6 text-center lg:mb-12 lg:px-0">
          <p class="label-kicker mb-3 text-brand">Marathia</p>
          <h2 class="display text-3xl tracking-[0.1em] sm:text-4xl">{{ t('home.awards') }}</h2>
          <span class="mx-auto mt-6 block h-px w-9 bg-brand" />
        </header>
        <div ref="viewport" class="awards-viewport overflow-x-auto lg:overflow-visible">
          <ul ref="track" class="awards-track flex items-center lg:justify-between">
            <template v-for="copy in 3" :key="copy">
              <li
                v-for="(src, i) in awards"
                :key="`${copy}-${src}`"
                :aria-hidden="copy > 1 ? 'true' : undefined"
                class="shrink-0 px-4 lg:flex-1 lg:border-l lg:border-brand/25 lg:px-2 lg:first:border-l-0"
                :class="copy > 1 ? 'lg:hidden' : ''"
              >
                <img
                  :src="src"
                  :alt="copy === 1 ? `${t('home.awardsAlt')} ${i + 1}` : ''"
                  class="mx-auto h-[140px] w-auto object-contain mix-blend-multiply lg:h-32 xl:h-36"
                />
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.awards-viewport {
  scrollbar-width: none;
  overscroll-behavior-x: contain;
}
.awards-viewport::-webkit-scrollbar {
  display: none;
}
.awards-track {
  width: max-content;
}
@media (min-width: 1024px) {
  .awards-track {
    width: auto;
  }
}
</style>
