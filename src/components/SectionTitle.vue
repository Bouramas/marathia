<script setup lang="ts">
withDefaults(
  defineProps<{
    kicker?: string
    title: string
    align?: 'center' | 'left'
    rule?: boolean
  }>(),
  { align: 'center', rule: true },
)
</script>

<template>
  <header
    class="mb-8"
    :class="[align === 'center' ? 'text-center' : 'text-left', rule && align === 'center' ? 'section-rule' : '']"
  >
    <p v-if="kicker" class="label-kicker text-brand mb-3">{{ kicker }}</p>
    <h2 class="display text-3xl tracking-[0.1em] sm:text-4xl md:tracking-[0.25em]">{{ title }}</h2>
  </header>
</template>
