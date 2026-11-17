<script setup lang="ts">
// Text-only opening of the homepage: a centered welcome (lead + body) followed
// by the "everything Tinos produces" story in a two-column editorial layout.
import BaseButton from './BaseButton.vue'
import DotSeparator from './DotSeparator.vue'

defineProps<{
  intro: string[]
  storyTitle: string
  story: string[]
  closing: string
  links: { to: string; label: string }[]
}>()
</script>

<template>
  <div>
    <!-- Welcome -->
    <section class="bg-cream py-16 lg:py-24">
      <div class="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <p class="text-xl font-light leading-relaxed text-ink sm:text-2xl sm:leading-[1.65]">{{ intro[0] }}</p>
        <div class="mx-auto my-8 h-px w-16 bg-brand/60"></div>
        <p v-for="p in intro.slice(1)" :key="p" class="mx-auto max-w-4xl leading-loose text-ink/75">{{ p }}</p>
      </div>
    </section>

    <DotSeparator />

    <!-- Story -->
    <section class="pb-16 pt-4 lg:pb-24">
      <div class="mx-auto max-w-5xl px-6 lg:px-10">
        <h2 class="display mx-auto mb-12 max-w-3xl text-balance text-center text-2xl leading-snug tracking-[0.08em] text-ink sm:text-3xl sm:tracking-[0.12em] lg:mb-16">
          {{ storyTitle }}
        </h2>
        <div class="gap-14 leading-loose text-ink/80 lg:columns-2 lg:[column-rule:1px_solid_rgb(201_161_91/0.45)]">
          <p v-for="p in story" :key="p" class="mb-6">{{ p }}</p>
        </div>
        <p class="mt-10 text-center text-xl font-light italic text-brand-dark sm:text-2xl">{{ closing }}</p>
        <div class="mt-10 flex flex-wrap justify-center gap-4">
          <BaseButton v-for="l in links" :key="l.to" :to="l.to" variant="outline">{{ l.label }}</BaseButton>
        </div>
      </div>
    </section>
  </div>
</template>
