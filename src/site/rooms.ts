// Room categories and the Google Calendar of every physical room in each.
// ONE place to edit. Each env var below holds a Calendar ID (set in .env.local, see Bookings.md).
// The API key (VITE_GCAL_API_KEY) is shared by all calendars.
const env = import.meta.env

export const ROOM_CATEGORIES = [
  {
    id: 'standard',
    labelKey: 'booking.roomStandard',
    pageKey: 'souites-kai-domatia/diklina',
    calendars: [env.VITE_GCAL_ID_STANDARD_1, env.VITE_GCAL_ID_STANDARD_2, env.VITE_GCAL_ID_STANDARD_3],
  },
  {
    id: 'superior',
    labelKey: 'booking.roomSuperior',
    pageKey: 'souites-kai-domatia/superior-diklina-orofou',
    calendars: [env.VITE_GCAL_ID_SUPERIOR_1, env.VITE_GCAL_ID_SUPERIOR_2],
  },
  {
    id: 'junior',
    labelKey: 'booking.roomJunior',
    pageKey: 'souites-kai-domatia/junior-suites',
    calendars: [env.VITE_GCAL_ID_JUNIOR_1, env.VITE_GCAL_ID_JUNIOR_2, env.VITE_GCAL_ID_JUNIOR_3],
  },
] as const

export type CategoryId = (typeof ROOM_CATEGORIES)[number]['id']

/** Configured (non-empty) calendar IDs for a category. */
export function calendarsFor(id: CategoryId): string[] {
  const cat = ROOM_CATEGORIES.find((c) => c.id === id)
  return ((cat?.calendars ?? []) as readonly (string | undefined)[]).filter((c): c is string => !!c)
}
