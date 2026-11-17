<script setup lang="ts">
import { useI18n } from 'vue-i18n'
defineProps<{ awards: string[] }>()
const { t } = useI18n()
</script>

<!-- Variant B: warm cream panel, title on the left, logos separated by thin vertical rules -->
<template>
  <section class="py-12 lg:py-20">
    <div class="mx-auto max-w-7xl px-6 lg:px-10">
      <div class="rounded-3xl bg-cream px-6 py-12 lg:flex lg:items-center lg:gap-14 lg:px-14 lg:py-14">
        <header class="mb-10 text-center lg:mb-0 lg:w-64 lg:shrink-0 lg:text-left">
          <p class="label-kicker mb-3 text-brand">Marathia</p>
          <h2 class="display text-3xl tracking-[0.1em] sm:text-4xl">{{ t('home.awards') }}</h2>
          <span class="mx-auto mt-6 block h-px w-9 bg-brand lg:mx-0" />
        </header>
        <ul
          class="-mx-6 flex flex-1 snap-x items-center gap-8 overflow-x-auto px-6 [scrollbar-width:none] lg:mx-0 lg:justify-between lg:gap-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          <li
            v-for="(src, i) in awards"
            :key="src"
            class="shrink-0 snap-center lg:flex-1 lg:border-l lg:border-brand/25 lg:px-4 lg:first:border-l-0"
          >
            <img
              :src="src"
              :alt="`${t('home.awardsAlt')} ${i + 1}`"
              class="mx-auto h-28 w-auto object-contain mix-blend-multiply lg:h-32"
              loading="lazy"
            />
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
