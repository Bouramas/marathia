<script setup lang="ts">
// Alternating image/text band for the homepage. Mobile-first: single column
// (image then text); from lg it becomes a vertically-centered two-column grid,
// with the image pushed to the right when `reverse` is set.
import BaseButton from './BaseButton.vue'

withDefaults(
  defineProps<{
    kicker?: string
    title: string
    body: string
    image: string
    ctaLabel?: string
    ctaTo?: string
    reverse?: boolean
    tint?: boolean
  }>(),
  { reverse: false, tint: false },
)
</script>

<template>
  <section class="py-12 lg:py-20" :class="tint ? 'bg-cream' : ''">
    <div class="mx-auto max-w-7xl px-6 lg:px-10">
      <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div class="overflow-hidden rounded-sm" :class="reverse ? 'lg:order-2' : 'lg:order-1'">
          <img
            :src="image"
            alt=""
            loading="lazy"
            class="aspect-[4/3] w-full object-cover transition duration-700 hover:scale-105 lg:aspect-[5/4]"
          />
        </div>
        <div class="max-w-xl" :class="reverse ? 'lg:order-1' : 'lg:order-2'">
          <p v-if="kicker" class="label-kicker text-brand mb-3">{{ kicker }}</p>
          <h2 class="mb-5 text-2xl font-semibold leading-snug text-ink sm:text-3xl">{{ title }}</h2>
          <p class="leading-relaxed text-ink/80">{{ body }}</p>
          <div v-if="ctaLabel && ctaTo" class="mt-8">
            <BaseButton :to="ctaTo" variant="outline">{{ ctaLabel }}</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
