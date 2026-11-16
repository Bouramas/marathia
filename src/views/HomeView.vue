<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { home, pathForKey, posts } from '@/composables/usePages'
import { useSeo } from '@/composables/useSeo'
import { homeBands, homeAwards } from '@/site/home-sections'
import HeroSection from '@/components/HeroSection.vue'
import HomeBand from '@/components/HomeBand.vue'
import SectionTitle from '@/components/SectionTitle.vue'
import BaseButton from '@/components/BaseButton.vue'
import DraftTranslationNotice from '@/components/DraftTranslationNotice.vue'

const { t } = useI18n()
const { locale, pick } = useLocale()

const latestPosts = computed(() =>
  [...posts]
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''))
    .slice(0, 3)
    .map((p) => ({ key: p.key, title: pick(p.title), image: p.hero?.image, href: pathForKey(p.key, locale.value) })),
)

useSeo(() => ({
  title: home ? pick(home.title) : t('brand'),
  description: home ? pick(home.seo.description) : '',
  locale: locale.value,
  path: pathForKey('home', locale.value) || '/',
  altLocale: locale.value === 'el' ? 'en' : 'el',
  altPath: pathForKey('home', locale.value === 'el' ? 'en' : 'el'),
}))
</script>

<template>
  <div>
    <HeroSection
      youtube-id="EIo8HOtHyyQ"
      poster="/assets/hero/poster.jpg"
      logo="/logos/logo_marathia.png"
      :logo-alt="t('brand')"
      :kicker="t('footer.madeIn')"
      :title="t('brand')"
      :cta-label="t('nav.reservation')"
      :cta-to="pathForKey('forma-kratisis-domatiou', locale) || '#'"
    />

    <DraftTranslationNotice v-if="locale === 'en' && home && !home.enReviewed" />

    <!-- Designed image/text bands (rebuild of the live front page) -->
    <HomeBand
      v-for="band in homeBands"
      :key="band.id"
      :kicker="pick(band.kicker)"
      :title="pick(band.title)"
      :body="pick(band.body)"
      :image="band.image"
      :cta-label="pick(band.ctaLabel)"
      :cta-to="pathForKey(band.ctaKey, locale) || '#'"
      :reverse="band.reverse"
      :tint="band.tint"
    />

    <!-- Opening hours -->
    <section class="py-12 lg:py-20">
      <div class="mx-auto max-w-4xl px-6 text-center lg:px-10">
        <SectionTitle :title="t('home.hours')" />
        <p class="text-lg text-ink/80">{{ t('home.restaurantHours') }}</p>
        <p class="mt-1 text-lg text-ink/80">{{ t('home.breakfastHours') }}</p>
        <div class="mt-8">
          <BaseButton :to="pathForKey('contact-us', locale) || '#'">{{ t('home.bookTable') }}</BaseButton>
        </div>
      </div>
    </section>

    <!-- Awards -->
    <section v-if="homeAwards.length" class="py-12 lg:py-20">
      <div class="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle :title="t('home.awards')" />
        <div class="grid grid-cols-2 items-center gap-8 sm:grid-cols-4">
          <div v-for="src in homeAwards" :key="src" class="flex h-32 items-center justify-center">
            <img :src="src" alt="" class="max-h-full max-w-full object-contain" loading="lazy" />
          </div>
        </div>
      </div>
    </section>

    <!-- Latest news -->
    <section v-if="latestPosts.length" class="bg-cream py-12 lg:py-20">
      <div class="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionTitle :kicker="t('brand')" :title="t('home.latestNews')" />
        <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <RouterLink v-for="p in latestPosts" :key="p.key" :to="p.href || '#'" class="group block">
            <div class="aspect-[4/3] overflow-hidden bg-white">
              <img
                v-if="p.image"
                :src="p.image"
                alt=""
                class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <h3 class="mt-4 text-sm leading-snug normal-case tracking-normal">{{ p.title }}</h3>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
