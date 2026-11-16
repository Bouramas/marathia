<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { posts } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import PageHeader from '@/components/PageHeader.vue'
import RichText from '@/components/RichText.vue'
import DraftTranslationNotice from '@/components/DraftTranslationNotice.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()

const post = computed(() => {
  const slug = route.params.slug as string
  return posts.find((p) => p.slug.el === slug || p.slug.en === slug)
})

useSeo(() => {
  const p = post.value
  return {
    title: p ? pick(p.title) : t('common.notFound'),
    description: p ? pick(p.seo.description) : '',
    locale: locale.value,
    path: route.path,
    image: p?.hero?.image,
  }
})
</script>

<template>
  <article v-if="post">
    <PageHeader :title="pick(post.title)" :image="post.hero?.image" :kicker="t('nav.blog')" />
    <DraftTranslationNotice v-if="locale === 'en' && !post.enReviewed" />
    <div class="mx-auto max-w-4xl px-6 py-12 lg:px-10 lg:py-20">
      <RichText :html="pick(post.body)" />
      <div class="mt-12">
        <RouterLink :to="'/blog'" class="label-kicker text-brand">
          ← {{ t('common.backToBlog') }}
        </RouterLink>
      </div>
    </div>
  </article>
  <div v-else class="mx-auto max-w-4xl px-6 py-16 text-center lg:px-10 lg:py-24">
    <h1 class="text-2xl">{{ t('common.notFound') }}</h1>
  </div>
</template>
