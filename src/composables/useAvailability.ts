// Booked nights of ONE room, read from that room's Google Calendar (see Bookings.md).
// Nothing is fetched until a room is selected.
import { ref, watch, type Ref } from 'vue'
import { unitById } from '@/site/rooms'

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

export function useAvailability(roomId: Ref<string>, monthsAhead = 18) {
  const booked = ref<Set<string>>(new Set())
  const loading = ref(false)
  const error = ref(false)
  const cache = new Map<string, Set<string>>()
  let token = 0

  async function load(id: string) {
    const mine = ++token
    error.value = false
    const calendarId = id ? unitById(id)?.unit.calendar : undefined
    if (!id || !calendarId || !API_KEY) {
      if (id) console.info('[availability] API key or calendar ID not set for', id, '; no dates blocked')
      booked.value = new Set()
      loading.value = false
      return
    }
    const hit = cache.get(id)
    if (hit) {
      booked.value = hit
      loading.value = false
      return
    }
    loading.value = true
    booked.value = new Set()
    try {
      const nights = await fetchRoomNights(calendarId, monthsAhead)
      if (mine !== token) return // room changed meanwhile
      cache.set(id, nights)
      booked.value = nights
    } catch (e) {
      if (mine !== token) return
      // A room that failed to load counts as free, so dates are never blocked wrongly.
      console.warn('[availability] calendar failed to load', e)
      error.value = true
    }
    loading.value = false
  }

  watch(roomId, load, { immediate: true })
  return { booked, loading, error }
}
