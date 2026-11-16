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

// Clean canonical footer links (hand-authored navigation module).
const links = computed(() =>
  FOOTER.map((l) => ({ label: pick(l.label), href: pathForKey(l.key as string, locale.value) }))
    .filter((l): l is { label: string; href: string } => Boolean(l.href)),
)
</script>

<template>
  <footer class="mt-24 bg-footer">
    <div class="mx-auto max-w-7xl px-6 py-14">
      <div class="flex flex-col items-center gap-6 text-center">
        <p class="text-lg tracking-[0.3em] uppercase">{{ t('brand') }}</p>
        <nav class="flex flex-wrap justify-center gap-5">
          <RouterLink
            v-for="l in links"
            :key="l.label"
            :to="l.href as string"
            class="text-xs tracking-[0.15em] uppercase text-ink/70 hover:text-brand"
          >
            {{ l.label }}
          </RouterLink>
        </nav>
        <div class="text-xs leading-relaxed text-ink/60">
          <p>Παραλία Αγίου Φωκά, Τήνος</p>
          <p>
            <a href="tel:+302283023249" class="hover:text-brand">22830 23249</a>
            ·
            <a href="mailto:info@marathiatinos.gr" class="hover:text-brand">info@marathiatinos.gr</a>
          </p>
        </div>
      </div>
    </div>
    <div class="border-t border-ink/10 py-4 text-center text-xs text-ink/60">
      © {{ year }} {{ t('brand') }}. {{ t('footer.rights') }}
    </div>
  </footer>
</template>
