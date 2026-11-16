<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import PageHeader from '@/components/PageHeader.vue'
import RichText from '@/components/RichText.vue'
import ReservationForm from '@/components/forms/ReservationForm.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()
const page = computed(() => pageByKey(route.meta.pageKey as string))

useSeo(() => ({
  title: page.value ? pick(page.value.title) : t('form.reservationTitle'),
  description: page.value ? pick(page.value.seo.description) : '',
  locale: locale.value,
  path: route.path,
}))
</script>

<template>
  <div>
    <PageHeader :title="page ? pick(page.title) : t('form.reservationTitle')" :image="page?.hero?.image" />
    <section class="mx-auto max-w-3xl px-6 py-12 lg:px-10 lg:py-20">
      <div v-if="page" class="mb-10 text-center">
        <RichText :html="pick(page.body)" />
      </div>
      <ReservationForm />
    </section>
  </div>
</template>
