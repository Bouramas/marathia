<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import SectionTitle from '@/components/SectionTitle.vue'
import DotSeparator from '@/components/DotSeparator.vue'
import ReservationForm from '@/components/forms/ReservationForm.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()
const page = computed(() => pageByKey(route.meta.pageKey as string))

useSeo(() => ({
  title: page.value ? pick(page.value.title) : t('booking.title'),
  description: t('booking.intro'),
  locale: locale.value,
  path: route.path,
}))
</script>

<template>
  <div>
    <section class="mx-auto max-w-7xl px-6 pt-16 pb-16 lg:px-10 lg:pt-24 lg:pb-24">
      <SectionTitle :kicker="t('booking.kicker')" :title="t('booking.title')" />
      <p class="mx-auto -mt-2 mb-14 max-w-xl text-center leading-relaxed text-ink/80">{{ t('booking.intro') }}</p>
      <ReservationForm />
    </section>
    <DotSeparator />
  </div>
</template>
