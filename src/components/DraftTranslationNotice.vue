<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
// Only shown in dev builds so machine/fallback translations are never silently
// presented to visitors as finished English. Tracked for human review.
const show = import.meta.env.DEV
</script>

<template>
  <div v-if="show" class="bg-cream-2 px-6 py-2 text-center text-xs text-ink/60">
    ⚠ {{ t('common.draftTranslation') }}
  </div>
</template>
