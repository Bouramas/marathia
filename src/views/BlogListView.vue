<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { pathForKey, posts } from '@/composables/usePages'
import { useSeo } from '@/composables/useSeo'
import PageHeader from '@/components/PageHeader.vue'

const { t } = useI18n()
const { locale, pick } = useLocale()

const items = computed(() =>
  [...posts]
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .map((p) => ({ key: p.key, title: pick(p.title), image: p.hero?.image, href: pathForKey(p.key, locale.value), date: p.date })),
)

useSeo(() => ({
  title: t('nav.blog'),
  description: '',
  locale: locale.value,
  path: '/blog',
  altLocale: locale.value === 'el' ? 'en' : 'el',
  altPath: undefined,
}))
</script>

<template>
  <div>
    <PageHeader :title="t('nav.blog')" :kicker="t('brand')" />
    <section class="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-20">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <RouterLink v-for="p in items" :key="p.key" :to="p.href || '#'" class="group block">
          <div class="aspect-[4/3] overflow-hidden bg-cream-2">
            <img
              v-if="p.image"
              :src="p.image"
              alt=""
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <h2 class="mt-4 text-sm leading-snug normal-case tracking-normal">{{ p.title }}</h2>
        </RouterLink>
      </div>
    </section>
  </div>
</template>
