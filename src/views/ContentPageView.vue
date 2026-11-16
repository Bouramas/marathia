<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey, pathForKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import PageHeader from '@/components/PageHeader.vue'
import RichText from '@/components/RichText.vue'
import DraftTranslationNotice from '@/components/DraftTranslationNotice.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()

const page = computed(() => pageByKey(route.meta.pageKey as string))

useSeo(() => {
  const p = page.value
  const other = locale.value === 'el' ? 'en' : 'el'
  return {
    title: p ? pick(p.title) : t('common.notFound'),
    description: p ? pick(p.seo.description) : '',
    locale: locale.value,
    path: route.path,
    altLocale: other,
    altPath: p ? pathForKey(p.key, other) : undefined,
    image: p?.hero?.image,
  }
})
</script>

<template>
  <article v-if="page">
    <PageHeader :title="pick(page.title)" :image="page.hero?.image" />
    <DraftTranslationNotice v-if="locale === 'en' && !page.enReviewed" />
    <div class="mx-auto max-w-4xl px-6 py-12 lg:px-10 lg:py-20">
      <RichText :html="pick(page.body)" />
    </div>
  </article>
  <div v-else class="mx-auto max-w-4xl px-6 py-16 text-center lg:px-10 lg:py-24">
    <h1 class="text-2xl">{{ t('common.notFound') }}</h1>
  </div>
</template>
