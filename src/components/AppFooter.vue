<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { socials } from '@/site/socials'
import { pathForKey } from '@/composables/usePages'
import { useUiStore } from '@/stores/ui'

const { t } = useI18n()
const ui = useUiStore()
const year = new Date().getFullYear()

const MAPS_URL = 'https://maps.app.goo.gl/cdfBHxouMkrSds4M6'

</script>

<template>
  <footer
    class="relative overflow-hidden bg-gradient-to-b from-[#eaeaea] to-white shadow-[0_-10px_28px_-16px_rgba(0,0,0,0.08)]"
  >
    <!-- depth: top highlight + soft watermark monogram -->
    <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/40" aria-hidden="true"></div>
    <img
      src="/logos/logo_marathia_monogram.png"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute -bottom-10 -right-10 w-72 select-none opacity-[0.12] md:w-96"
    />
    <div class="relative mx-auto max-w-7xl px-6 pt-14 pb-10">
      <div class="flex justify-center">
        <RouterLink to="/" aria-label="Marathia">
          <img src="/logos/logo_marathia.png" alt="Marathia" class="h-14 w-auto" />
        </RouterLink>
      </div>

      <div class="mt-12 flex flex-col gap-10 border-t border-brand pt-10 md:flex-row md:items-start md:justify-between">
        <!-- Left: contact + social -->
        <div class="flex flex-col items-center gap-8 text-center md:items-start md:text-left">
          <ul class="space-y-2 text-sm leading-relaxed text-ink/70">
            <li>
              <a href="tel:+302283023249" class="inline-flex items-center gap-1.5 transition-colors hover:text-brand">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" class="h-4 w-4 shrink-0 text-brand" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z" /></svg>
                <span>+30 22830 23249</span>
              </a>
            </li>
            <li>
              <a href="mailto:info@marathiatinos.gr" class="inline-flex items-center gap-1.5 transition-colors hover:text-brand">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" class="h-4 w-4 shrink-0 text-brand" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
                <span>info@marathiatinos.gr</span>
              </a>
            </li>
            <li>
              <a
                :href="MAPS_URL"
                target="_blank"
                rel="noopener noreferrer"
                :title="t('footer.openMaps')"
                class="group inline-flex items-center gap-1.5 transition-colors hover:text-brand"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-4 w-4 shrink-0 text-brand" aria-hidden="true">
                  <path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" />
                  <circle cx="12" cy="9.5" r="2.5" />
                </svg>
                <span class="border-b border-dotted border-ink/40 group-hover:border-brand">Παραλία Αγίου Φωκά, Τήνος</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-3 w-3 shrink-0 opacity-60" aria-hidden="true">
                  <path d="M7 17L17 7M9 7h8v8" />
                </svg>
                <span class="sr-only">({{ t('footer.openMaps') }})</span>
              </a>
            </li>
            <li class="inline-flex items-start gap-1.5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" class="mt-0.5 h-4 w-4 shrink-0 text-brand" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
              <span>
                <span class="block">{{ t('home.hours') }}</span>
                <span class="block">{{ t('home.restaurantHours') }}</span>
                <span class="block">{{ t('home.breakfastHours') }}</span>
              </span>
            </li>
          </ul>
        </div>

        <!-- Right: social -->
          <div class="flex flex-col items-center gap-3 md:items-end">
            <p class="label-kicker text-xs tracking-[0.25em] uppercase text-ink/60">{{ t('footer.followUs') }}</p>
            <ul class="flex gap-3">
              <li v-for="s in socials" :key="s.name">
                <a
                  :href="s.href"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="s.name"
                  class="flex h-12 w-12 items-center justify-center rounded-full border border-brand/60 text-brand transition-all hover:border-2 hover:border-brand"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" :class="s.name === 'Facebook' ? 'h-6 w-6' : 'h-5 w-5'" aria-hidden="true">
                    <path :d="s.path" />
                  </svg>
                </a>
              </li>
            </ul>
            <RouterLink
              :to="pathForKey('privacy-policy', ui.locale) ?? '/'"
              class="text-xs text-ink/50 underline-offset-2 hover:text-ink/80 hover:underline"
            >
              {{ t('footer.privacy') }}
            </RouterLink>
          </div>
      </div>
    </div>

    <div class="relative pb-6 pt-2 text-center text-xs text-ink/60">
      marathiatinos.gr © {{ year }} | {{ t('footer.rights') }}
    </div>
  </footer>
</template>
