import type { RouterScrollBehavior } from 'vue-router'
import { START_LOCATION } from 'vue-router'

// Scroll handling that cooperates with the page transition in App.vue: the scroll
// reset is deferred until the old view has faded out and the new one is inserted,
// so the user never sees the page scroll while content is visible.

const HEADER_OFFSET = 88 // fixed header (72px) + breathing room
const FALLBACK_MS = 800 // never block scrolling if the transition hook doesn't fire

let pending: (() => void) | null = null

/** Called by App.vue when the incoming view has been inserted (invisible, about to fade in). */
export function notifyViewEntered() {
  pending?.()
  pending = null
}

function afterTransition(): Promise<void> {
  return new Promise((resolve) => {
    const timer = window.setTimeout(done, FALLBACK_MS)
    function done() {
      window.clearTimeout(timer)
      if (pending === done) pending = null
      resolve()
    }
    pending?.() // release any superseded navigation
    pending = done
  })
}

export const scrollBehavior: RouterScrollBehavior = async (to, from, saved) => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const anchor = to.hash
    ? ({ el: to.hash, top: HEADER_OFFSET, behavior: reduced ? 'auto' : 'smooth' } as const)
    : null

  // Same view, only hash/query changed: no transition to wait for.
  if (from !== START_LOCATION && to.path === from.path) {
    return anchor || saved || false
  }
  // First load: no transition runs.
  if (from === START_LOCATION) {
    return saved || (anchor ? { ...anchor, behavior: 'auto' } : { top: 0 })
  }

  await afterTransition()
  if (saved) return saved
  if (anchor) return anchor
  return { top: 0, behavior: 'instant' }
}
