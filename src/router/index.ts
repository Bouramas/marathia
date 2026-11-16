import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import type { Locale, PageContent } from '@/types/content'
import { pages, posts, home } from '@/content'
import { canonicalBase } from '@/composables/usePages'
import { localePath } from '@/composables/useLocale'
import { useUiStore } from '@/stores/ui'
import retired from '@/site/retired.json'

// Retired pages: no canonical route of their own; their old URLs redirect to the
// canonical base of the page that absorbed them (e.g. the empty /tinos landing →
// the "at a glance" overview now served at /tinos).
const RETIRED = retired as Record<string, string>

// Slugs that render a dedicated view instead of the generic content page.
const FORM_KINDS: Record<string, 'reservation' | 'contact'> = {
  'forma-kratisis-domatiou': 'reservation',
  'contact-us': 'contact',
}

const ContentPageView = () => import('@/views/ContentPageView.vue')
const HomeView = () => import('@/views/HomeView.vue')
const BlogListView = () => import('@/views/BlogListView.vue')
const PostView = () => import('@/views/PostView.vue')
const MenuView = () => import('@/views/MenuView.vue')
const ReservationView = () => import('@/views/ReservationView.vue')
const ContactView = () => import('@/views/ContactView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

function componentFor(page: PageContent) {
  const kind = FORM_KINDS[page.key]
  if (kind === 'reservation') return ReservationView
  if (kind === 'contact') return ContactView
  return ContentPageView
}

/** Canonical path for a content item in a locale (el at clean root, en under /en/). */
function canonicalPathFor(page: PageContent, locale: Locale): string {
  if (page.type === 'home') return localePath('', locale)
  if (page.type === 'post') return localePath(page.slug.el, locale, 'post')
  return localePath(canonicalBase(page), locale, 'page')
}

const LOCALES: Locale[] = ['el', 'en']

const routes: RouteRecordRaw[] = [
  { path: '/', name: 'home-el', component: HomeView, meta: { locale: 'el', pageKey: 'home' } },
  { path: '/en', name: 'home-en', component: HomeView, meta: { locale: 'en', pageKey: 'home' } },
  { path: '/blog', name: 'blog-el', component: BlogListView, meta: { locale: 'el' } },
  { path: '/en/blog', name: 'blog-en', component: BlogListView, meta: { locale: 'en' } },
  { path: '/menu', name: 'menu-el', component: MenuView, meta: { locale: 'el' } },
  { path: '/en/menu', name: 'menu-en', component: MenuView, meta: { locale: 'en' } },
]

// Every canonical route path, so old-URL redirects never shadow a real page.
const canonicalPaths = new Set(routes.map((r) => r.path))

// One route per content page, per locale, at its clean canonical slug.
for (const page of pages) {
  if (RETIRED[page.key]) continue // retired — only redirects, added below
  const component = componentFor(page)
  for (const locale of LOCALES) {
    const path = canonicalPathFor(page, locale)
    routes.push({
      path,
      name: `page-${locale}-${page.key}`,
      component,
      meta: { locale, pageKey: page.key, noindex: locale === 'en' && !page.enReviewed },
    })
    canonicalPaths.add(path)
  }
}

// Blog posts (el + en), under /blog and /en/blog.
for (const post of posts) {
  for (const locale of LOCALES) {
    const path = canonicalPathFor(post, locale)
    routes.push({
      path,
      name: `post-${locale}-${post.key}`,
      component: PostView,
      meta: { locale, pageKey: post.key, noindex: locale === 'en' && !post.enReviewed },
    })
    canonicalPaths.add(path)
  }
}

// Redirect every old WordPress URL (both locales) to its new canonical URL, so
// existing SEO/links carry over. Derived from the real WP slugs on each content
// item; skipped when the old path already is a canonical route (the page wins).
const redirects = new Map<string, string>()
function addRedirect(from: string, to: string) {
  if (from === to || canonicalPaths.has(from) || redirects.has(from)) return
  redirects.set(from, to)
}
for (const page of [home, ...pages]) {
  const retireBase = RETIRED[page.key]
  const elTarget = retireBase ? localePath(retireBase, 'el', 'page') : canonicalPathFor(page, 'el')
  const enTarget = retireBase ? localePath(retireBase, 'en', 'page') : canonicalPathFor(page, 'en')
  addRedirect(localePath(page.slug.el, 'el', 'page'), elTarget)
  // A retired page has no canonical route, so also redirect its /en/ twin.
  if (retireBase) addRedirect(localePath(page.slug.el, 'en', 'page'), enTarget)
  if (page.slug.en && page.slug.en !== page.slug.el) {
    addRedirect(localePath(page.slug.en, 'el', 'page'), enTarget)
  }
}
for (const post of posts) {
  if (post.slug.en && post.slug.en !== post.slug.el) {
    addRedirect(localePath(post.slug.en, 'el', 'post'), canonicalPathFor(post, 'en'))
  }
}
for (const [from, to] of redirects) {
  routes.push({ path: from, redirect: to })
}

routes.push({ path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView, meta: { noindex: true } })

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, saved) {
    return saved || { top: 0 }
  },
})

router.beforeEach((to) => {
  const locale = (to.meta.locale as Locale) || 'el'
  const ui = useUiStore()
  if (ui.locale !== locale) ui.setLocale(locale)
  ui.toggleMobileNav(false)
})

// Per-route robots meta tag (SEO).
router.afterEach((to) => {
  const noindex = Boolean(to.meta.noindex)
  let tag = document.querySelector('meta[name="robots"]')
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', 'robots')
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', noindex ? 'noindex, nofollow' : 'index, follow')
})
