<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { home, pathForKey } from '@/composables/usePages'
import { useSeo } from '@/composables/useSeo'
import { homeBands, homeAwards, homeIntro } from '@/site/home-sections'
import HeroSection from '@/components/HeroSection.vue'
import DotSeparator from '@/components/DotSeparator.vue'
import HomeIntro from '@/components/HomeIntro.vue'
import HomeBand from '@/components/HomeBand.vue'
import AwardsPanel from '@/components/AwardsPanel.vue'
import DraftTranslationNotice from '@/components/DraftTranslationNotice.vue'

const { t } = useI18n()
const { locale, pick } = useLocale()

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
      :cta-label="t('home.reserve')"
      :cta-to="pathForKey('contact-us', locale) || '#'"
    />

    <DraftTranslationNotice v-if="locale === 'en' && home && !home.enReviewed" />

    <HomeIntro
      :intro="homeIntro.intro.map(pick)"
      :story-title="pick(homeIntro.storyTitle)"
      :story="homeIntro.story.map(pick)"
      :closing="pick(homeIntro.closing)"
      :links="homeIntro.links.map((l) => ({ to: pathForKey(l.key, locale) || '#', label: pick(l.label) }))"
    />

    <!-- Designed image/text bands (rebuild of the live front page) -->
    <template v-for="band in homeBands" :key="band.id">
    <DotSeparator v-if="band.id === 'delicacies'" />
    <HomeBand
      :kicker="pick(band.kicker)"
      :title="pick(band.title)"
      :body="pick(band.body)"
      :image="band.image"
      :cta-label="pick(band.ctaLabel)"
      :cta-to="pathForKey(band.ctaKey, locale) || '#'"
      :secondary-cta-label="band.secondaryCta && pick(band.secondaryCta.label)"
      :secondary-cta-to="band.secondaryCta && (pathForKey(band.secondaryCta.key, locale) || '#')"
      :links="band.links?.map((l) => ({ to: pathForKey(l.key, locale) || '#', label: pick(l.label) }))"
      :framed="band.framed"
      :arch="band.arch"
      :image-position="band.imagePosition"
      :image-aspect="band.imageAspect"
      :reverse="band.reverse"
      :tint="band.tint"
      :extra="band.extra && {
        kicker: pick(band.extra.kicker),
        title: pick(band.extra.title),
        body: pick(band.extra.body),
        ctaLabel: pick(band.extra.ctaLabel),
        ctaTo: pathForKey(band.extra.ctaKey, locale) || '#',
      }"
    />
    </template>

    <!-- Awards -->
    <AwardsPanel v-if="homeAwards.length" :awards="homeAwards" />
  </div>
</template>
