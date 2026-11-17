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
    links?: { to: string; label: string }[]
    framed?: boolean
    arch?: boolean
  }>(),
  { reverse: false, tint: false },
)
</script>

<template>
  <section class="py-12 lg:py-20" :class="tint ? 'bg-cream' : ''">
    <div class="mx-auto max-w-7xl px-6 lg:px-10">
      <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <!-- Framed variant: portrait crop with an offset gold outline, optionally arched -->
        <div
          v-if="framed"
          class="relative mx-auto w-full max-w-[340px] lg:max-w-[400px]"
          :class="reverse ? 'lg:order-2' : 'lg:order-1'"
        >
          <div
            aria-hidden="true"
            class="absolute top-4 h-full w-full border border-brand/60 sm:top-6"
            :class="[arch ? 'rounded-t-[999px] rounded-b-sm' : 'rounded-sm', reverse ? '-left-4 sm:-left-6' : '-right-4 sm:-right-6']"
          ></div>
          <div class="relative overflow-hidden" :class="arch ? 'rounded-t-[999px] rounded-b-sm' : 'rounded-sm'">
            <img
              :src="image"
              alt=""
              loading="lazy"
              class="aspect-[3/4] w-full object-cover transition duration-700 hover:scale-105"
            />
          </div>
        </div>
        <div v-else class="overflow-hidden rounded-sm" :class="reverse ? 'lg:order-2' : 'lg:order-1'">
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
          <ul v-if="links?.length" class="mt-8 border-t border-ink/15">
            <li v-for="(l, i) in links" :key="l.to" class="border-b border-ink/15">
              <RouterLink :to="l.to" class="group flex items-baseline gap-5 py-5">
                <span class="label-kicker w-8 shrink-0 text-brand">{{ String(i + 1).padStart(2, '0') }}</span>
                <span class="flex-1 text-lg font-semibold tracking-wide text-ink transition group-hover:text-brand sm:text-xl">{{ l.label }}</span>
                <span aria-hidden="true" class="text-brand transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
              </RouterLink>
            </li>
          </ul>
          <div v-else-if="ctaLabel && ctaTo" class="mt-8">
            <BaseButton :to="ctaTo" variant="outline">{{ ctaLabel }}</BaseButton>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
