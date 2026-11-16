<script setup lang="ts">
// Renders sanitized content HTML produced by scripts/generate-content.mjs.
// The HTML is build-time, allow-listed output from our own migration pipeline
// (not user input), so v-html is safe here.
defineProps<{ html: string }>()
</script>

<template>
  <div class="prose-marathia max-w-none" v-html="html"></div>
</template>
