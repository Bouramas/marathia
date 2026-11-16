<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <section class="mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-24 text-center lg:px-10 lg:py-32">
    <p class="label-kicker text-brand">404</p>
    <h1 class="text-3xl">{{ t('common.notFound') }}</h1>
    <RouterLink :to="'/'" class="label-kicker text-link">
      {{ t('common.backHome') }}
    </RouterLink>
  </section>
</template>
