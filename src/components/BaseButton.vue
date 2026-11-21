<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    type?: 'button' | 'submit'
    variant?: 'solid' | 'outline' | 'hero'
    disabled?: boolean
  }>(),
  { type: 'button', variant: 'solid', disabled: false },
)

const classes = computed(() => [
  'inline-flex items-center justify-center px-7 py-3 label-kicker cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
  'hero-btn border-2 border-brand bg-transparent font-semibold',
  props.variant === 'hero' ? 'text-white' : 'text-black',
])
</script>

<template>
  <RouterLink v-if="to" :to="to" :class="classes">
    <slot />
  </RouterLink>
  <a v-else-if="href" :href="href" :class="classes" target="_blank" rel="noopener">
    <slot />
  </a>
  <button v-else :type="type" :disabled="disabled" :class="classes">
    <slot />
  </button>
</template>

<style scoped>
.hero-btn {
  --btn-fill: rgb(255 255 255 / 0.16);
  background-image: linear-gradient(var(--btn-fill), var(--btn-fill));
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: 100% 0%;
  transition:
    background-size 0.5s cubic-bezier(0.25, 1, 0.5, 1),
    transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
}
.hero-btn:not(.text-white) {
  --btn-fill: rgb(201 161 91 / 0.22);
}
.hero-btn:hover,
.hero-btn:focus-visible {
  background-size: 100% 100%;
}
.hero-btn:active {
  transform: scale(0.98);
}
@media (prefers-reduced-motion: reduce) {
  .hero-btn {
    transition-duration: 0.01ms;
  }
}
</style>
