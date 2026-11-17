<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { pathForKey } from '@/composables/usePages'
import { FOOTER } from '@/site/navigation'

const { t } = useI18n()
const { locale, pick } = useLocale()
const year = new Date().getFullYear()

const MAPS_URL = 'https://maps.app.goo.gl/cdfBHxouMkrSds4M6'

// Clean canonical footer links (hand-authored navigation module).
const links = computed(() =>
  FOOTER.map((l) => ({ label: pick(l.label), href: pathForKey(l.key as string, locale.value) }))
    .filter((l): l is { label: string; href: string } => Boolean(l.href)),
)

// TODO: replace '#' placeholders with the real profile URLs.
const socials = [
  {
    name: 'Facebook',
    href: '#',
    path: 'M13.5 22v-8.2h2.8l.5-3.4h-3.3V8.3c0-1 .4-1.7 1.8-1.7h1.6V3.5c-.3 0-1.3-.1-2.4-.1-2.5 0-4.2 1.5-4.2 4.3v2.7H7.5v3.4h2.8V22h3.2z',
  },
  {
    name: 'Instagram',
    href: '#',
    path: 'M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z',
  },
  {
    name: 'Substack',
    href: '#',
    path: 'M22.54 6.42H1.46V8.7h21.08V6.42zM1.46 10.81V24L12 18.11 22.54 24V10.81H1.46zM22.54 0H1.46v2.28h21.08V0z',
  },
]
</script>

<template>
  <footer
    class="relative mt-24 overflow-hidden bg-gradient-to-b from-[#eaeaea] to-white shadow-[0_-10px_28px_-16px_rgba(0,0,0,0.08)]"
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
          </ul>

          <div class="flex flex-col items-center gap-3 md:items-start">
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
          </div>
        </div>

        <!-- Right: site links (hidden on mobile) -->
        <nav class="hidden md:block md:text-right" :aria-label="t('footer.quickLinks')">
          <ul class="space-y-2">
            <li v-for="l in links" :key="l.label">
              <RouterLink
                :to="l.href"
                class="text-sm text-ink/70 transition-colors hover:text-brand"
              >
                {{ l.label }}
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="relative pb-6 pt-2 text-center text-xs text-ink/60">
      marathiatinos.gr © {{ year }} | {{ t('footer.rights') }}
    </div>
  </footer>
</template>
