<script setup lang="ts">
import { useI18n } from 'vue-i18n'
defineProps<{ awards: string[] }>()
const { t } = useI18n()
</script>

<!-- Variant B: warm cream panel, title on the left, logos separated by thin vertical rules.
     Below lg the panel is full-bleed and the logos drift slowly in a seamless loop (set is duplicated). -->
<template>
  <section class="py-12 lg:py-20">
    <div class="mx-auto max-w-7xl lg:px-10">
      <div class="bg-cream py-12 lg:rounded-3xl lg:px-10 lg:py-14 xl:flex xl:items-center xl:gap-10">
        <header class="mb-10 px-6 text-center xl:mb-0 xl:w-56 xl:shrink-0 xl:px-0 xl:text-left">
          <p class="label-kicker mb-3 text-brand">Marathia</p>
          <h2 class="display text-3xl tracking-[0.1em] sm:text-4xl">{{ t('home.awards') }}</h2>
          <span class="mx-auto mt-6 block h-px w-9 bg-brand xl:mx-0" />
        </header>
        <div class="awards-viewport overflow-hidden lg:overflow-visible xl:flex-1">
          <ul class="awards-track flex items-center lg:justify-between">
            <template v-for="copy in 2" :key="copy">
              <li
                v-for="(src, i) in awards"
                :key="`${copy}-${src}`"
                :aria-hidden="copy === 2 ? 'true' : undefined"
                class="shrink-0 px-4 lg:flex-1 lg:border-l lg:border-brand/25 lg:px-2 lg:first:border-l-0"
                :class="copy === 2 ? 'lg:hidden' : ''"
              >
                <img
                  :src="src"
                  :alt="copy === 1 ? `${t('home.awardsAlt')} ${i + 1}` : ''"
                  class="mx-auto h-[140px] w-auto object-contain mix-blend-multiply lg:h-[7.5rem] xl:h-32"
                  loading="lazy"
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
.awards-track {
  width: max-content;
  animation: awards-scroll 50s linear infinite;
}
@media (min-width: 1024px) {
  .awards-track {
    width: auto;
    animation: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .awards-viewport {
    overflow-x: auto;
  }
  .awards-track {
    animation: none;
  }
}
@keyframes awards-scroll {
  to {
    transform: translateX(-50%);
  }
}
</style>
