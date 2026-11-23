// Room categories, their physical rooms and the Google Calendar of each room.
// ONE place to edit. Each env var below holds a Calendar ID (set in .env.local, see Bookings.md).
// The API key (VITE_GCAL_API_KEY) is shared by all calendars.
import type { Localized } from '@/types/content'

const env = import.meta.env
const L = (el: string, en: string): Localized => ({ el, en })

export interface RoomUnit {
  id: string
  label: Localized
  beds: Localized
  calendar?: string
}

export interface RoomCategory {
  id: 'standard' | 'superior' | 'junior'
  labelKey: string
  pageKey: string
  /** Guests the beds sleep. */
  sleeps: number
  /** One extra child (up to EXTRA_CHILD_MAX_AGE) can sleep on the living-area couch, on top of `sleeps`. */
  extraChild?: boolean
  rooms: RoomUnit[]
}

export const EXTRA_CHILD_MAX_AGE = 10

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: 'standard',
    labelKey: 'booking.roomStandard',
    pageKey: 'souites-kai-domatia/diklina',
    sleeps: 2,
    rooms: [
      { id: 'standard-a', label: L('Δωμάτιο Α', 'Room A'), beds: L('Queen size κρεβάτι', 'Queen bed'), calendar: env.VITE_GCAL_ID_STANDARD_1 },
      { id: 'standard-b', label: L('Δωμάτιο Β', 'Room B'), beds: L('2 μονά κρεβάτια που ενώνονται', '2 single beds that unite'), calendar: env.VITE_GCAL_ID_STANDARD_2 },
      { id: 'standard-c', label: L('Δωμάτιο Γ', 'Room C'), beds: L('2 μονά κρεβάτια που ενώνονται', '2 single beds that unite'), calendar: env.VITE_GCAL_ID_STANDARD_3 },
    ],
  },
  {
    id: 'superior',
    labelKey: 'booking.roomSuperior',
    pageKey: 'souites-kai-domatia/superior-diklina-orofou',
    sleeps: 2,
    extraChild: true,
    rooms: [
      { id: 'superior-a', label: L('Δωμάτιο Α', 'Room A'), beds: L('Queen size κρεβάτι με μικρό σαλονάκι', 'Queen bed with a small living area'), calendar: env.VITE_GCAL_ID_SUPERIOR_1 },
      { id: 'superior-b', label: L('Δωμάτιο Β', 'Room B'), beds: L('Queen size κρεβάτι με μικρό σαλονάκι', 'Queen bed with a small living area'), calendar: env.VITE_GCAL_ID_SUPERIOR_2 },
    ],
  },
  {
    id: 'junior',
    labelKey: 'booking.roomJunior',
    pageKey: 'souites-kai-domatia/junior-suites',
    sleeps: 4,
    rooms: [
      { id: 'junior-1', label: L('Σουίτα 1', 'Suite 1'), beds: L('Queen size κρεβάτι + 2 μονά', 'Queen bed + 2 single beds'), calendar: env.VITE_GCAL_ID_JUNIOR_1 },
      { id: 'junior-2', label: L('Σουίτα 2', 'Suite 2'), beds: L('Queen size κρεβάτι + 2 μονά', 'Queen bed + 2 single beds'), calendar: env.VITE_GCAL_ID_JUNIOR_2 },
      { id: 'junior-3', label: L('Σουίτα 3', 'Suite 3'), beds: L('Queen size κρεβάτι + 2 μονά', 'Queen bed + 2 single beds'), calendar: env.VITE_GCAL_ID_JUNIOR_3 },
    ],
  },
]

export type CategoryId = RoomCategory['id']

export const categoryById = (id: string) => ROOM_CATEGORIES.find((c) => c.id === id)

export function unitById(id: string): { category: RoomCategory; unit: RoomUnit } | undefined {
  for (const category of ROOM_CATEGORIES) {
    const unit = category.rooms.find((r) => r.id === id)
    if (unit) return { category, unit }
  }
  return undefined
}

/** Does this party fit the category? Superior takes one extra child (couch) beyond its 2 beds. */
export function fitsCategory(cat: RoomCategory, adults: number, children: number): boolean {
  const total = adults + children
  if (total <= cat.sleeps) return true
  return !!cat.extraChild && total === cat.sleeps + 1 && children >= 1 && adults <= cat.sleeps
}

/** Largest party any single room takes. */
export const MAX_GUESTS = Math.max(...ROOM_CATEGORIES.map((c) => c.sleeps))
