// Booked nights for a room category, read from the Google Calendars of its rooms (see Bookings.md).
// A night is booked for the category only when EVERY room in it is booked that night.
// Nothing is fetched until a category is selected.
import { ref, watch, type Ref } from 'vue'
import { calendarsFor, type CategoryId } from '@/site/rooms'

const API_KEY = import.meta.env.VITE_GCAL_API_KEY as string | undefined

const pad = (n: number) => String(n).padStart(2, '0')
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const parse = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

interface GcalEvent {
  status?: string
  start?: { date?: string; dateTime?: string }
  end?: { date?: string; dateTime?: string }
}

/** Expand calendar events into the set of booked night dates (YYYY-MM-DD). End date is exclusive. */
export function eventsToNights(events: GcalEvent[]): Set<string> {
  const nights = new Set<string>()
  for (const ev of events) {
    if (ev.status === 'cancelled' || !ev.start || !ev.end) continue
    const start = ev.start.date ?? ev.start.dateTime?.slice(0, 10)
    const end = ev.end.date ?? ev.end.dateTime?.slice(0, 10)
    if (!start || !end) continue
    const last = parse(end)
    // Timed events ending on the same day still block that night.
    if (end <= start) last.setDate(last.getDate() + 1)
    for (let d = parse(start); d < last; d.setDate(d.getDate() + 1)) nights.add(iso(d))
  }
  return nights
}

async function fetchRoomNights(calendarId: string, monthsAhead: number): Promise<Set<string>> {
  const now = new Date()
  const params = new URLSearchParams({
    key: API_KEY!,
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: '2500',
    timeMin: new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString(),
    timeMax: new Date(now.getFullYear(), now.getMonth() + monthsAhead, 1).toISOString(),
  })
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?${params}`,
  )
  if (!res.ok) throw new Error(`Calendar API ${res.status}`)
  const data = (await res.json()) as { items?: GcalEvent[] }
  return eventsToNights(data.items ?? [])
}

/** Nights present in every set. */
function intersect(sets: Set<string>[]): Set<string> {
  if (!sets.length) return new Set()
  return new Set([...sets[0]].filter((n) => sets.every((s) => s.has(n))))
}

export function useAvailability(category: Ref<CategoryId | ''>, monthsAhead = 18) {
  const booked = ref<Set<string>>(new Set())
  const loading = ref(false)
  const error = ref(false)
  const cache = new Map<CategoryId, { booked: Set<string>; error: boolean }>()
  let token = 0

  async function load(cat: CategoryId | '') {
    const mine = ++token
    error.value = false
    if (!cat) {
      booked.value = new Set()
      loading.value = false
      return
    }
    const hit = cache.get(cat)
    if (hit) {
      booked.value = hit.booked
      error.value = hit.error
      loading.value = false
      return
    }
    const ids = calendarsFor(cat)
    if (!API_KEY || !ids.length) {
      console.info('[availability] API key or calendar IDs not set for', cat, '; no dates blocked')
      booked.value = new Set()
      loading.value = false
      return
    }
    loading.value = true
    booked.value = new Set()
    const results = await Promise.allSettled(ids.map((id) => fetchRoomNights(id, monthsAhead)))
    if (mine !== token) return // category changed meanwhile
    const failed = results.some((r) => r.status === 'rejected')
    // A room that failed to load counts as free, so dates are never blocked wrongly.
    const sets = results.map((r) => (r.status === 'fulfilled' ? r.value : new Set<string>()))
    const merged = intersect(sets)
    if (failed) console.warn('[availability] some calendars failed to load', results)
    if (!failed) cache.set(cat, { booked: merged, error: false })
    booked.value = merged
    error.value = failed
    loading.value = false
  }

  watch(category, load, { immediate: true })
  return { booked, loading, error }
}
