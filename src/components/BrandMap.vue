<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.0386801129084!2d25.177362276620666!3d37.53058547204798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a2eca30ae45be1%3A0x7f7a46f3d40153f8!2sMarathia!5e0!3m2!1sen!2sgr!4v1794848789390!5m2!1sen!2sgr'
</script>

<template>
  <div class="h-full min-h-[360px] overflow-hidden rounded-sm border border-brand/40 bg-cream">
    <iframe
      :src="SRC"
      :title="t('contact.mapTitle')"
      class="h-full min-h-[360px] w-full border-0"
      loading="lazy"
      allowfullscreen
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</template>
