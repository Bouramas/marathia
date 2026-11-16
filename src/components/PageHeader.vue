<script setup lang="ts">
// Page header used at the top of content/post pages. Shows a hero image when
// available (featured image carried over from WP), otherwise a plain band.
defineProps<{
  title: string
  kicker?: string
  image?: string
}>()
</script>

<template>
  <header
    class="relative flex min-h-[38vh] items-center justify-center overflow-hidden bg-cream px-6 py-16 text-center md:min-h-[46vh] lg:px-10 lg:py-24"
  >
    <img
      v-if="image"
      :src="image"
      alt=""
      class="absolute inset-0 h-full w-full object-cover"
      loading="eager"
    />
    <div v-if="image" class="absolute inset-0 bg-black/35"></div>
    <div class="relative z-10 max-w-3xl" :class="image ? 'text-white' : 'text-ink'">
      <p v-if="kicker" class="label-kicker mb-4" :class="image ? 'text-white/90' : 'text-brand'">
        {{ kicker }}
      </p>
      <h1 class="display text-4xl tracking-[0.1em] sm:text-5xl md:tracking-[0.25em]">{{ title }}</h1>
    </div>
  </header>
</template>
