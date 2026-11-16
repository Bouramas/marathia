<script setup lang="ts">
// Full-width hero for the home / landing pages. Supports a background video
// (the original site's home-page video) with an image poster fallback, replacing
// the old Revolution Slider.
import BaseButton from './BaseButton.vue'

defineProps<{
  image?: string
  video?: string
  youtubeId?: string
  logo?: string
  logoAlt?: string
  poster?: string
  kicker?: string
  title: string
  subtitle?: string
  ctaLabel?: string
  ctaTo?: string
}>()
</script>

<template>
  <section class="relative flex min-h-[88vh] items-center justify-center overflow-hidden text-center">
    <div v-if="youtubeId" class="pointer-events-none absolute inset-0 overflow-hidden">
      <iframe
        class="absolute left-1/2 top-1/2 h-[max(100%,56.25vw)] w-[max(100%,177.78vh)] -translate-x-1/2 -translate-y-1/2"
        :src="`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=1&start=0&end=33&controls=0&playsinline=1&rel=0&loop=1&playlist=${youtubeId}&modestbranding=1&disablekb=1`"
        title=""
        allow="autoplay; encrypted-media"
        tabindex="-1"
        aria-hidden="true"
      ></iframe>
    </div>
    <video
      v-else-if="video"
      class="absolute inset-0 h-full w-full object-cover"
      :poster="poster"
      autoplay
      muted
      loop
      playsinline
    >
      <source :src="video" type="video/mp4" />
    </video>
    <img
      v-else-if="image"
      :src="image"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
      loading="eager"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/55"></div>

    <div class="relative z-10 max-w-3xl px-6 text-white">
      <p v-if="kicker" class="label-kicker mb-6 text-[10px] text-white/90 sm:text-xs md:text-sm">{{ kicker }}</p>
      <h1 v-if="logo" class="mx-auto w-[min(80vw,640px)]">
        <img :src="logo" :alt="logoAlt || title" class="h-auto w-full" />
      </h1>
      <h1 v-else class="display text-5xl leading-tight tracking-[0.1em] sm:text-7xl sm:tracking-[0.2em] xl:text-8xl xl:tracking-[0.3em]">
        {{ title }}
      </h1>
      <p v-if="subtitle" class="mx-auto mt-6 max-w-xl text-base text-white/85">{{ subtitle }}</p>
      <div v-if="ctaLabel && ctaTo" class="mt-10">
        <BaseButton :to="ctaTo">{{ ctaLabel }}</BaseButton>
      </div>
    </div>

    <!-- scroll cue -->
    <div class="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/70">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  </section>
</template>
