<script setup lang="ts">
// Shared template for the three room pages (standard, superior, junior): full-bleed
// hero, quick facts, overview with what's included, photo gallery, themed amenities,
// the other rooms and a booking call-to-action. Data: src/site/room-pages.ts.
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey, pathForKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import { roomPages, roomUi, sharedAmenities } from '@/site/room-pages'
import { suites } from '@/site/suites-page'
import BaseButton from '@/components/BaseButton.vue'
import DotSeparator from '@/components/DotSeparator.vue'
import RoomGallery from '@/components/RoomGallery.vue'
import AmenityGroup from '@/components/AmenityGroup.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()

const key = computed(() => route.meta.pageKey as string)
const page = computed(() => pageByKey(key.value))
const room = computed(() => roomPages[key.value])
const info = computed(() => suites.rooms.find((r) => r.key === key.value))
const name = computed(() => (info.value ? pick(info.value.name) : page.value ? pick(page.value.title) : ''))
const others = computed(() => suites.rooms.filter((r) => r.key !== key.value))

const groups = computed(() => {
  const r = room.value
  const s = sharedAmenities
  return [
    { icon: s.comfort.icon, title: s.comfort.title, items: [...r.beds, ...s.comfort.items] },
    { icon: s.kitchen.icon, title: s.kitchen.title, items: [...r.kitchen, ...s.kitchen.items] },
    { icon: s.bath.icon, title: s.bath.title, items: s.bath.items },
    { icon: s.services.icon, title: s.services.title, items: s.services.items },
  ].map((g) => ({ icon: g.icon, title: pick(g.title), items: g.items.map((i) => pick(i)) }))
})

const gallery = computed(() => room.value.gallery.map((g) => ({ src: g.src, alt: pick(g.alt) })))
const galleryLabels = computed(() => ({
  open: pick(roomUi.galleryOpen),
  close: pick(roomUi.close),
  prev: pick(roomUi.prev),
  next: pick(roomUi.next),
}))

useSeo(() => {
  const other = locale.value === 'el' ? 'en' : 'el'
  return {
    title: page.value ? pick(page.value.title) : t('nav.suites'),
    description: page.value ? pick(page.value.seo.description) : '',
    image: room.value?.hero,
    locale: locale.value,
    path: route.path,
    altLocale: other,
    altPath: page.value ? pathForKey(page.value.key, other) : undefined,
  }
})
</script>

<template>
  <article v-if="room">
    <!-- Hero -->
    <header class="relative flex min-h-[78vh] items-end overflow-hidden bg-ink md:min-h-[85vh]">
      <img :src="room.hero" alt="" class="absolute inset-0 h-full w-full object-cover" loading="eager" />
      <div class="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/40"></div>
      <div class="relative z-10 mx-auto w-full max-w-7xl px-6 pb-12 text-white lg:px-10 lg:pb-20">
        <RouterLink
          :to="pathForKey('souites-kai-domatia', locale) || '#'"
          class="label-kicker mb-6 inline-block text-white/85 transition hover:text-brand"
        >&larr; {{ pick(roomUi.back) }}</RouterLink>
        <p class="label-kicker mb-4 text-brand">{{ pick(roomUi.kicker) }}</p>
        <h1 class="display text-4xl tracking-[0.08em] sm:text-5xl md:tracking-[0.16em] xl:text-6xl">{{ name }}</h1>
      </div>
    </header>

    <!-- Quick facts -->
    <section class="border-b border-ink/10 bg-cream">
      <ul class="mx-auto grid max-w-5xl grid-cols-1 divide-y divide-ink/15 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 lg:px-10">
        <li v-for="f in room.facts" :key="pick(f.label)" class="px-4 py-6 text-center sm:py-8">
          <p class="label-kicker text-ink/60">{{ pick(f.label) }}</p>
          <p class="display mt-2 text-lg tracking-[0.06em] text-brand sm:text-xl">{{ pick(f.value) }}</p>
        </li>
      </ul>
    </section>

    <!-- Overview -->
    <section class="py-14 lg:py-24">
      <div class="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20 lg:px-10">
        <div>
          <span class="mb-6 block h-px w-14 bg-brand"></span>
          <p class="text-lg font-light leading-relaxed text-ink/85 lg:text-xl">{{ pick(room.intro) }}</p>
        </div>
        <aside class="relative self-start">
          <div aria-hidden="true" class="absolute -right-3 top-3 h-full w-full border border-brand/60 sm:-right-4 sm:top-4"></div>
          <div class="relative bg-cream p-7 sm:p-9">
            <p class="label-kicker mb-5 text-brand">{{ pick(roomUi.includedKicker) }}</p>
            <ul class="space-y-4">
              <li v-for="(inc, i) in roomUi.included" :key="i" class="flex gap-4 leading-snug text-ink/85">
                <span class="label-kicker mt-0.5 text-brand">{{ String(i + 1).padStart(2, '0') }}</span>
                <span>{{ pick(inc) }}</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </section>

    <!-- Gallery -->
    <section class="pb-14 lg:pb-24">
      <div class="mx-auto max-w-7xl px-6 lg:px-10">
        <div class="mb-8 text-center lg:mb-12">
          <p class="label-kicker mb-3 text-brand">{{ pick(roomUi.galleryKicker) }}</p>
          <h2 class="display text-2xl tracking-[0.1em] sm:text-3xl sm:tracking-[0.14em]">{{ pick(roomUi.galleryTitle) }}</h2>
        </div>
        <RoomGallery :images="gallery" :labels="galleryLabels" />
      </div>
    </section>

    <!-- Amenities -->
    <section class="bg-cream py-14 lg:py-24">
      <div class="mx-auto max-w-6xl px-6 lg:px-10">
        <div class="mb-10 text-center lg:mb-14">
          <p class="label-kicker mb-3 text-brand">{{ pick(roomUi.amenitiesKicker) }}</p>
          <h2 class="display text-2xl tracking-[0.1em] sm:text-3xl sm:tracking-[0.14em]">{{ pick(roomUi.amenitiesTitle) }}</h2>
        </div>

        <!-- Room-specific highlights -->
        <div class="mb-10 border-y border-brand/40 py-7 text-center lg:mb-14">
          <p class="label-kicker mb-4 text-ink/60">{{ pick(roomUi.signatureKicker) }}</p>
          <ul class="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <li
              v-for="(s, i) in room.signature"
              :key="i"
              class="display text-lg tracking-[0.08em] text-ink sm:text-xl"
            >
              <span v-if="i > 0" class="mr-3 text-brand" aria-hidden="true">&middot;</span>{{ pick(s) }}
            </li>
          </ul>
        </div>

        <div class="grid md:grid-cols-2">
          <AmenityGroup
            v-for="(g, i) in groups"
            :key="g.title"
            :icon="g.icon"
            :title="g.title"
            :items="g.items"
            :index="i"
            class="border-ink/15 not-first:border-t md:nth-2:border-t-0 md:odd:border-r"
          />
        </div>
        <p class="mt-8 text-center text-sm text-ink/60">{{ pick(roomUi.linenNote) }}</p>
      </div>
    </section>

    <!-- Other rooms -->
    <section class="py-14 lg:py-24">
      <div class="mx-auto max-w-5xl px-6 lg:px-10">
        <div class="mb-10 text-center">
          <p class="label-kicker mb-3 text-brand">{{ pick(roomUi.othersKicker) }}</p>
          <h2 class="display text-2xl tracking-[0.1em] sm:text-3xl sm:tracking-[0.14em]">{{ pick(roomUi.othersTitle) }}</h2>
        </div>
        <div class="grid gap-8 sm:grid-cols-2">
          <RouterLink
            v-for="o in others"
            :key="o.key"
            :to="pathForKey(o.key, locale) || '#'"
            class="group block"
          >
            <div class="overflow-hidden rounded-sm">
              <img :src="o.image" alt="" loading="lazy" class="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div class="mt-5 flex items-baseline justify-between gap-4 border-b border-ink/15 pb-4">
              <div>
                <h3 class="display text-xl tracking-[0.1em] transition group-hover:text-brand">{{ pick(o.name) }}</h3>
                <p class="label-kicker mt-2 text-brand">{{ pick(o.size) }}</p>
              </div>
              <span aria-hidden="true" class="text-brand transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <DotSeparator />

    <!-- Booking CTA -->
    <section class="bg-cream py-16 text-center lg:py-20">
      <div class="mx-auto max-w-2xl px-6">
        <h2 class="display text-2xl tracking-[0.1em] sm:text-3xl">{{ pick(roomUi.ctaTitle) }}</h2>
        <span class="mx-auto my-6 block h-px w-14 bg-brand"></span>
        <p class="leading-relaxed text-ink/80">{{ pick(roomUi.ctaBody) }}</p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <BaseButton :to="pathForKey('forma-kratisis-domatiou', locale) || '#'" variant="outline">{{ pick(roomUi.ctaBook) }}</BaseButton>
          <BaseButton :to="pathForKey('contact-us', locale) || '#'" variant="outline">{{ pick(roomUi.ctaContact) }}</BaseButton>
        </div>
      </div>
    </section>
  </article>
</template>
