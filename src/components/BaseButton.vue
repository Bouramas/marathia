<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = withDefaults(
  defineProps<{
    to?: string
    href?: string
    type?: 'button' | 'submit'
    variant?: 'solid' | 'outline'
    disabled?: boolean
  }>(),
  { type: 'button', variant: 'solid', disabled: false },
)

const classes = computed(() => [
  'inline-flex items-center justify-center px-7 py-3 label-kicker transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
  props.variant === 'solid'
    ? 'bg-brand text-white hover:bg-brand-dark'
    : 'border border-ink text-ink hover:bg-ink hover:text-white',
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
