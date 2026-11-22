<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useUiStore } from '@/stores/ui'
import { useLocale } from '@/composables/useLocale'
import { pathForKey } from '@/composables/usePages'
import { MENU, type NavItem } from '@/site/navigation'
import LanguageSwitcher from './LanguageSwitcher.vue'

const { t } = useI18n()
const route = useRoute()
const ui = useUiStore()
const { mobileNavOpen } = storeToRefs(ui)
const { locale, pick } = useLocale()

const homeHref = computed(() => pathForKey('home', locale.value) || '/')
const reservationHref = computed(() => pathForKey('contact-us', locale.value) || '#')

function href(item: NavItem): string | null {
  return item.key ? pathForKey(item.key, locale.value) ?? null : null
}

// Transparent over the homepage hero; solid white once scrolled, and on inner pages.
const isHome = computed(() => route.name === 'home-el' || route.name === 'home-en')
const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 24 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
const transparent = computed(() => isHome.value && !scrolled.value && !mobileNavOpen.value)

// Mobile accordion
const openGroup = ref<string | null>(null)
function toggleGroup(label: string) { openGroup.value = openGroup.value === label ? null : label }
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="transparent ? 'text-white' : 'border-b border-ink/10 bg-white/90 text-ink backdrop-blur-md'"
  >
    <!-- scrim for logo/nav contrast over a bright hero -->
    <div
      v-if="transparent"
      class="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/45 to-transparent"
    />

    <div class="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-6">
      <RouterLink :to="homeHref" class="shrink-0" aria-label="Marathia">
        <img src="/logos/logo_marathia.png" alt="Marathia" class="h-9 w-auto" />
      </RouterLink>

      <!-- Desktop nav -->
      <nav class="hidden items-center gap-8 lg:flex">
        <div v-for="item in MENU" :key="pick(item.label)" class="nav-group relative">
          <RouterLink
            v-if="item.key && !item.children"
            :to="href(item)!"
            class="navlink"
            active-class="is-active"
          >
            {{ pick(item.label) }}
          </RouterLink>
          <template v-else>
            <button type="button" class="navlink flex items-center gap-1.5">
              {{ pick(item.label) }}
              <svg class="h-3 w-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
            <div class="nav-panel absolute left-1/2 top-full w-64 pt-5">
              <ul class="rounded-md border border-ink/10 bg-white py-2 text-center text-ink shadow-[0_18px_40px_-20px_rgba(0,0,0,0.4)]">
                <li v-for="c in item.children" :key="pick(c.label)">
                  <RouterLink v-if="c.key" :to="href(c)!" class="droplink" :class="{ 'droplink-parent': c.children }" active-class="text-brand">
                    {{ pick(c.label) }}
                  </RouterLink>
                  <ul v-if="c.children" class="droplist-sub mb-1">
                    <li v-for="s in c.children" :key="pick(s.label)">
                      <RouterLink v-if="s.key" :to="href(s)!" class="droplink droplink-sub" active-class="text-brand">
                        {{ pick(s.label) }}
                      </RouterLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </nav>

      <div class="flex items-center gap-4">
        <button
          type="button"
          class="relative h-6 w-7 lg:hidden"
          :aria-expanded="mobileNavOpen"
          aria-label="Menu"
          @click="ui.toggleMobileNav()"
        >
          <span class="absolute left-0 block h-0.5 w-7 bg-current transition-all" :class="mobileNavOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-1'"></span>
          <span class="absolute left-0 top-1/2 block h-0.5 w-7 -translate-y-1/2 bg-current transition-opacity" :class="mobileNavOpen ? 'opacity-0' : ''"></span>
          <span class="absolute left-0 block h-0.5 w-7 bg-current transition-all" :class="mobileNavOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-1'"></span>
        </button>
        <LanguageSwitcher />
      </div>
    </div>

    <!-- Mobile nav -->
    <Transition name="mnav">
      <nav v-if="mobileNavOpen" class="border-t border-ink/10 bg-white text-ink lg:hidden">
        <div class="max-h-[75vh] overflow-y-auto px-6 py-2">
          <div v-for="item in MENU" :key="pick(item.label)" class="border-b border-ink/5 last:border-0">
            <RouterLink
              v-if="item.key && !item.children"
              :to="href(item)!"
              class="block py-4 text-sm tracking-[0.14em] uppercase"
              @click="ui.toggleMobileNav(false)"
            >
              {{ pick(item.label) }}
            </RouterLink>
            <template v-else>
              <button
                type="button"
                class="flex w-full items-center justify-between py-4 text-sm tracking-[0.14em] uppercase"
                @click="toggleGroup(pick(item.label))"
              >
                {{ pick(item.label) }}
                <svg
                  class="h-4 w-4 transition-transform"
                  :class="openGroup === pick(item.label) ? 'rotate-180' : ''"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                >
                  <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
              <ul v-if="openGroup === pick(item.label)" class="pb-2">
                <li v-for="c in item.children" :key="pick(c.label)">
                  <RouterLink
                    v-if="c.key"
                    :to="href(c)!"
                    class="block py-2.5 pl-4 text-xs tracking-[0.1em] uppercase text-ink/70"
                    :class="{ 'font-semibold text-ink': c.children }"
                    @click="ui.toggleMobileNav(false)"
                  >
                    {{ pick(c.label) }}
                  </RouterLink>
                  <ul v-if="c.children" class="ml-4 border-l border-brand/50">
                    <li v-for="s in c.children" :key="pick(s.label)">
                      <RouterLink
                        v-if="s.key"
                        :to="href(s)!"
                        class="block py-2 pl-4 text-xs tracking-[0.1em] uppercase text-ink/55"
                        @click="ui.toggleMobileNav(false)"
                      >
                        {{ pick(s.label) }}
                      </RouterLink>
                    </li>
                  </ul>
                </li>
              </ul>
            </template>
          </div>
          <RouterLink :to="reservationHref" class="my-4 block" @click="ui.toggleMobileNav(false)">
            <span class="block w-full bg-brand py-3 text-center text-xs tracking-[0.18em] uppercase text-white">
              {{ t('nav.reservation') }}
            </span>
          </RouterLink>
        </div>
      </nav>
    </Transition>
  </header>

  <!-- Spacer: inner pages start below the fixed header; home flows under it. -->
  <div v-if="!isHome" class="h-[72px]" aria-hidden="true" />
</template>

<style scoped>
.navlink {
  position: relative;
  white-space: nowrap;
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: color 0.2s ease;
}
.navlink::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -8px;
  height: 1px;
  background: var(--color-brand);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.28s ease;
}
.nav-group:hover .navlink::after,
.navlink.is-active::after {
  transform: scaleX(1);
}

.nav-panel {
  visibility: hidden;
  opacity: 0;
  transform: translate(-50%, 6px);
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s;
}
.nav-group:hover .nav-panel {
  visibility: visible;
  opacity: 1;
  transform: translate(-50%, 0);
}

.droplink {
  display: block;
  padding: 0.6rem 1.25rem;
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-ink) 75%, transparent);
  transition: color 0.2s ease, background-color 0.2s ease;
}
.droplink:hover {
  color: var(--color-brand);
  background: var(--color-cream);
}
.droplink-parent {
  font-weight: 600;
  color: var(--color-ink);
}
.droplist-sub {
  margin: 0 1.25rem 0.25rem 2.5rem;
  border-left: 1px solid color-mix(in srgb, var(--color-brand) 60%, transparent);
}
.droplist-sub .droplink-sub {
  padding-left: 1rem;
  padding-right: 0.5rem;
  text-align: left;
}
.droplink-sub {
  padding: 0.45rem 1.25rem;
  font-size: 0.68rem;
  color: color-mix(in srgb, var(--color-ink) 55%, transparent);
}

.mnav-enter-active,
.mnav-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.mnav-enter-from,
.mnav-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
