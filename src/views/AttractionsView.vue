<script setup lang="ts">
// Attractions: an editorial page. Each attraction gets its own layout (full-bleed
// overlay, split, tall image, arched image, text-only, wide banner, museum list).
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { pageByKey, pathForKey } from '@/composables/usePages'
import { useLocale } from '@/composables/useLocale'
import { useSeo } from '@/composables/useSeo'
import { attractions } from '@/site/tinos-pages'
import SectionTitle from '@/components/SectionTitle.vue'
import BaseButton from '@/components/BaseButton.vue'

const route = useRoute()
const { t } = useI18n()
const { locale, pick } = useLocale()
const page = pageByKey(route.meta.pageKey as string)

const all = attractions.groups.flatMap((g) => g.items)
const A = (id: string) => all.find((i) => i.id === id)!
const museums = attractions.groups.find((g) => g.id === 'museums')!

const evangelistria = A('evangelistria')
const town = A('town')
const exombourgo = A('exombourgo')
const dovecotes = A('dovecotes')
const villages = A('villages')
const volax = A('volax')

useSeo(() => {
  const other = locale.value === 'el' ? 'en' : 'el'
  return {
    title: page ? pick(page.title) : t('nav.attractions'),
    description: pick(attractions.intro),
    image: attractions.image,
    locale: locale.value,
    path: route.path,
    altLocale: other,
    altPath: page ? pathForKey(page.key, other) : undefined,
  }
})
</script>

<template>
  <article>
    <header class="mx-auto grid max-w-7xl gap-10 px-6 pb-4 pt-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:pt-28">
      <div class="lg:col-span-5">
        <p class="label-kicker mb-5 text-brand">{{ t('brand') }}</p>
        <h1 class="display text-4xl tracking-[0.08em] sm:text-5xl md:tracking-[0.2em] lg:text-6xl">
          {{ page ? pick(page.title) : t('nav.attractions') }}
        </h1>
        <span class="mt-8 block h-px w-14 bg-brand"></span>
      </div>
      <p class="text-xl font-light leading-relaxed text-ink/85 sm:text-2xl lg:col-span-7 lg:text-[1.75rem] lg:leading-[1.6]">
        {{ pick(attractions.intro) }}
      </p>
    </header>

    <!-- Our Lady of Tinos: text left, image right -->
    <section id="a-evangelistria" class="scroll-mt-24">
      <div class="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
        <div class="lg:col-span-7">
          <p class="label-kicker mb-4 text-brand">{{ pick(attractions.groups[0].title) }}</p>
          <h2 class="display text-2xl tracking-[0.08em] sm:text-3xl md:tracking-[0.15em]">{{ pick(evangelistria.title) }}</h2>
          <span class="my-6 block h-px w-14 bg-brand"></span>
          <p class="leading-relaxed text-ink/80">{{ pick(evangelistria.body) }}</p>
        </div>
        <div class="relative lg:col-span-5">
          <div aria-hidden="true" class="absolute -left-4 top-4 h-full w-full rounded-sm border border-brand/60 sm:-left-6 sm:top-6"></div>
          <figure class="relative overflow-hidden rounded-sm">
            <img :src="evangelistria.image" alt="" loading="lazy" class="h-auto w-full" />
          </figure>
        </div>
      </div>
    </section>

    <!-- Tinos Town: image left, text right -->
    <section id="a-town" class="scroll-mt-24 bg-cream">
      <div class="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-16 lg:px-10 lg:py-24">
        <div class="relative lg:col-span-5">
          <div aria-hidden="true" class="absolute -right-4 top-4 h-full w-full rounded-sm border border-brand/60 sm:-right-6 sm:top-6"></div>
          <figure class="relative overflow-hidden rounded-sm">
            <img :src="town.image" alt="" loading="lazy" class="h-auto w-full" />
          </figure>
        </div>
        <div class="lg:col-span-7">
          <p class="label-kicker mb-4 text-brand">{{ pick(attractions.groups[0].title) }}</p>
          <h2 class="display text-2xl tracking-[0.08em] sm:text-3xl md:tracking-[0.15em]">{{ pick(town.title) }}</h2>
          <span class="my-6 block h-px w-14 bg-brand"></span>
          <p class="leading-relaxed text-ink/80">{{ pick(town.body) }}</p>
        </div>
      </div>
    </section>

    <!-- Exombourgo: oversized altitude figure, text left, tall image right -->
    <section id="a-exombourgo" class="scroll-mt-24">
      <div class="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:py-24">
        <div class="lg:col-span-7">
          <p class="display text-7xl font-light leading-none text-brand sm:text-8xl">540<span class="text-3xl sm:text-4xl"> m</span></p>
          <h2 class="display mt-6 text-2xl tracking-[0.08em] sm:text-3xl md:tracking-[0.15em]">{{ pick(exombourgo.title) }}</h2>
          <p class="mt-6 max-w-xl leading-relaxed text-ink/80">{{ pick(exombourgo.body) }}</p>
        </div>
        <div class="relative lg:col-span-5 lg:mt-16">
          <div aria-hidden="true" class="absolute -left-4 top-4 h-full w-full rounded-sm border border-brand/60 sm:-left-6 sm:top-6"></div>
          <figure class="relative overflow-hidden rounded-sm">
            <img :src="exombourgo.image" alt="" loading="lazy" class="h-auto w-full" />
          </figure>
        </div>
      </div>
    </section>

    <!-- Dovecotes: small arched image beside a short note, on ink -->
    <section id="a-dovecotes" class="scroll-mt-24 bg-ink text-white">
      <div class="mx-auto flex max-w-4xl flex-col items-center gap-10 px-6 py-16 text-center sm:flex-row sm:text-left lg:gap-16 lg:px-10 lg:py-20">
        <div class="w-48 shrink-0 overflow-hidden rounded-t-[999px] rounded-b-sm sm:w-56">
          <img :src="dovecotes.image" alt="" loading="lazy" class="aspect-[3/4] w-full object-cover object-[78%_50%]" />
        </div>
        <div>
          <h2 class="display text-2xl tracking-[0.08em] text-brand sm:text-3xl md:tracking-[0.15em]">{{ pick(dovecotes.title) }}</h2>
          <p class="mt-5 text-lg font-light leading-relaxed text-white/90">{{ pick(dovecotes.body) }}</p>
        </div>
      </div>
    </section>

    <!-- Villages: text only, set as a large pull-style paragraph -->
    <section id="a-villages" class="scroll-mt-24">
      <div class="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-12 lg:gap-14 lg:px-10 lg:py-24">
        <div class="lg:col-span-6">
          <p class="label-kicker mb-4 text-brand">{{ pick(attractions.groups[1].title) }}</p>
          <h2 class="display text-2xl tracking-[0.08em] sm:text-3xl md:tracking-[0.15em]">{{ pick(villages.title) }}</h2>
          <p class="mt-8 border-l-2 border-brand pl-6 text-lg font-light leading-relaxed text-ink/85 lg:pl-8">
            {{ pick(villages.body) }}
          </p>
        </div>
        <div class="relative lg:col-span-6">
          <div aria-hidden="true" class="absolute -left-4 top-4 h-full w-full rounded-sm border border-brand/60 sm:-left-6 sm:top-6"></div>
          <figure class="relative overflow-hidden rounded-sm">
            <img src="/assets/pictures/tinos/pirgos_village_nikos_kavvadas_unsplash.jpg" alt="" loading="lazy" class="h-auto w-full" />
          </figure>
        </div>
      </div>
    </section>

    <!-- Volax: wide banner, text below in two columns -->
    <section id="a-volax" class="scroll-mt-24 bg-cream pb-16 lg:pb-24">
      <!-- Parallax banner: fixed background on lg+ (touch devices fall back to a static crop) -->
      <div
        role="img"
        aria-label=""
        class="h-48 w-full bg-cover bg-center sm:h-56 lg:h-64 lg:bg-fixed"
        :style="{ backgroundImage: `url(${volax.image})` }"
      ></div>
      <div class="mx-auto max-w-5xl px-6 pt-12 lg:px-10 lg:pt-16">
        <SectionTitle :title="pick(volax.title)" />
        <p class="mt-10 leading-relaxed text-ink/80 lg:columns-2 lg:gap-14">{{ pick(volax.body) }}</p>
      </div>
    </section>

    <!-- Museums: typographic list; only Pyrgos carries an image -->
    <section class="py-16 lg:py-24">
      <div class="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionTitle :kicker="t('brand')" :title="pick(museums.title)" />
        <ul class="mt-10 border-t border-ink/15">
          <li
            v-for="m in museums.items"
            :id="'a-' + m.id"
            :key="m.id"
            class="scroll-mt-24 grid gap-4 border-b border-ink/15 py-8 lg:grid-cols-12 lg:gap-10"
          >
            <h3 class="text-lg font-semibold leading-snug lg:col-span-4">{{ pick(m.title) }}</h3>
            <div class="lg:col-span-8" :class="m.image ? 'grid gap-6 sm:grid-cols-[1fr_12rem] sm:items-start' : ''">
              <p class="font-light leading-relaxed text-ink/80">{{ pick(m.body) }}</p>
              <img v-if="m.image" :src="m.image" alt="" loading="lazy" class="aspect-[4/5] w-full object-cover" />
            </div>
          </li>
        </ul>
      </div>
    </section>

    <section class="pb-16 lg:pb-24">
      <div class="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <p class="label-kicker mb-6 text-brand">{{ t('tinos.explore') }}</p>
        <BaseButton :to="pathForKey('i-tinos/paralies', locale) || '#'" variant="outline">
          {{ t('nav.beaches') }}
        </BaseButton>
      </div>
    </section>
  </article>
</template>
