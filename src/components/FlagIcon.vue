<script setup lang="ts">
// Inline SVG flags (no network asset). GR = Greek, GB = English.
defineProps<{ country: 'gr' | 'gb' }>()
</script>

<template>
  <svg
    v-if="country === 'gr'"
    viewBox="0 0 27 18"
    class="h-full w-full"
    aria-hidden="true"
  >
    <rect width="27" height="18" fill="#0d5eaf" />
    <g fill="#fff">
      <rect y="2" width="27" height="2" />
      <rect y="6" width="27" height="2" />
      <rect y="10" width="27" height="2" />
      <rect y="14" width="27" height="2" />
    </g>
    <rect width="10" height="10" fill="#0d5eaf" />
    <rect x="4" width="2" height="10" fill="#fff" />
    <rect y="4" width="10" height="2" fill="#fff" />
  </svg>
  <svg v-else viewBox="0 0 60 30" class="h-full w-full" aria-hidden="true">
    <clipPath id="gb-clip"><rect width="60" height="30" /></clipPath>
    <g clip-path="url(#gb-clip)">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" stroke-width="6" />
      <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" stroke-width="4" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" stroke-width="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" stroke-width="6" />
    </g>
  </svg>
</template>
