<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import { menu } from '@/content'
import PageHeader from '@/components/PageHeader.vue'
import RichText from '@/components/RichText.vue'

const { t } = useI18n()
const { locale, pick } = useLocale()

const dishes = computed(() => menu)

useSeo(() => ({
  title: t('nav.menu'),
  description: '',
  locale: locale.value,
  path: '/menu',
  altLocale: locale.value === 'el' ? 'en' : 'el',
  altPath: undefined,
}))
</script>

<template>
  <div>
    <PageHeader :title="t('nav.menu')" :kicker="t('brand')" />
    <section class="mx-auto max-w-5xl px-6 py-12 lg:px-10 lg:py-20">
      <div class="grid gap-10 sm:grid-cols-2">
        <article v-for="d in dishes" :key="d.key" class="flex gap-5">
          <div v-if="d.image" class="h-24 w-24 shrink-0 overflow-hidden bg-cream-2">
            <img :src="d.image" alt="" class="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h3 class="text-base">{{ pick(d.title) }}</h3>
            <div class="mt-1 text-sm text-ink/70">
              <RichText :html="pick(d.body)" />
            </div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
