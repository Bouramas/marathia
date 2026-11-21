# Bookings: showing Google Calendar availability

The booking calendar (`src/components/forms/DateRangePicker.vue`) greys out nights that are
booked in a Google Calendar. The browser reads the calendar live through the Google Calendar
API v3, using a restricted API key.

Booking requests are still stubbed (AGENTS.md §8). Availability is display-only; you still
add confirmed bookings to the Google Calendar by hand.

## How it works

- The guest picks a room category first (Standard, Superior, Junior). Until then no Google
  Calendar request is made and the date picker is locked.
- Each physical room has its own calendar. Choosing a category loads the calendars of all its
  rooms (`src/composables/useAvailability.ts`).
- A night is blocked only when **every** room of the category is booked that night.
- A blocked day cannot be a check-in; it can be a check-out if the night before is free. A range
  spanning a blocked night is rejected.
- Changing category clears the chosen dates. Results are cached per category.
- If a key or calendar ID is missing, or a request fails, that room counts as free (dates are
  never blocked wrongly) and the form shows a notice on failure.

## Minimum stay

Rules live in `src/site/stay-rules.ts` (`minNights`), based on the **check-in date**:

- July and August: 3 nights, any weekday.
- June and September: 1 night for Mon–Thu check-in, 2 nights for Fri–Sun check-in.
- Other months: 1 night.

The calendar only enables check-outs on or after the minimum, and a check-in is only enabled if the
minimum stay fits without a booked night. The rules are shown under the calendar and in "Good to
know"; the form also re-validates on submit. Copy is in i18n `booking.minStay*` / `info4`.

## Room to calendar mapping

Edit one file: `src/site/rooms.ts`. Each room reads its Calendar ID from its own env var:

| Category | Rooms | Env vars |
|---|---|---|
| Standard | 3 | `VITE_GCAL_ID_STANDARD_1`, `_2`, `_3` |
| Superior | 2 | `VITE_GCAL_ID_SUPERIOR_1`, `_2` |
| Junior suites | 3 | `VITE_GCAL_ID_JUNIOR_1`, `_2`, `_3` |

The API key (`VITE_GCAL_API_KEY`) is shared. To add a room, add its env var to `rooms.ts` and
`env.d.ts`.

## Calendar conventions

Use one dedicated calendar per physical room (create new calendars, not your personal one).

| Booking | Create as | Result |
|---|---|---|
| Guest stays nights 1, 2, 3 Dec, leaves 4 Dec | All-day event, start 1 Dec, end 4 Dec (exclusive) | 1, 2, 3 Dec booked; 4 Dec free for check-out and new check-in |

Rules:
- All-day events only. The event end is exclusive, so the check-out day stays free.
- Title: neutral, e.g. `Booked`. Never guest names, phone numbers or notes (see Privacy).

## Setup

### 1. Google Cloud project and API key

1. Open https://console.cloud.google.com/ and create a project (e.g. `marathia-site`).
2. APIs & Services > Library > search "Google Calendar API" > Enable.
3. APIs & Services > Credentials > Create credentials > API key.
4. Edit the key:
   - Application restrictions: Websites. Add `https://marathiatinos.gr/*`, `https://www.marathiatinos.gr/*`, `http://localhost:*`.
   - API restrictions: Restrict key > Google Calendar API only.
5. Copy the key.

### 2. Calendar sharing

1. Google Calendar > Settings > your room calendar.
2. Do this for every room calendar. Access permissions for events > tick "Make available to public".
3. Set it to "See all event details". The "free/busy only" option cannot be read with an API key.
4. Integrate calendar > copy the **Calendar ID** (looks like `abc123@group.calendar.google.com`).

### 3. Local configuration

Create `.env.local` in the project root (git-ignored, do not commit or paste it in chat):

```
VITE_GCAL_API_KEY=your-api-key
VITE_GCAL_ID_STANDARD_1=...@group.calendar.google.com
VITE_GCAL_ID_STANDARD_2=...
VITE_GCAL_ID_STANDARD_3=...
VITE_GCAL_ID_SUPERIOR_1=...
VITE_GCAL_ID_SUPERIOR_2=...
VITE_GCAL_ID_JUNIOR_1=...
VITE_GCAL_ID_JUNIOR_2=...
VITE_GCAL_ID_JUNIOR_3=...
```

Restart `npm run dev` after changing it. For production, the same variables must be set
when running `npm run deploy` (Vite inlines them at build time).

### 4. Test

1. In the room calendar add an all-day event `Booked` for a few days next month.
2. `npm run dev`, open `/booking`; the Network tab shows no calendar request yet.
3. Choose the room category: one request per room calendar is made. Days booked in all rooms of the category appear struck through and unclickable; the legend shows.
4. Pick a check-in before the block: days after the block cannot be chosen as check-out.
5. The end date of the event (check-out day) can be chosen as check-out or check-in.
6. Browser DevTools > Network: the `googleapis.com/calendar/v3/...` request returns 200.

## Troubleshooting

| Symptom | Cause |
|---|---|
| Nothing blocked, console says keys/IDs not set for the category | `.env.local` missing or dev server not restarted |
| 403 `accessNotConfigured` | Calendar API not enabled in the project |
| 403 referer not allowed | Key's website restriction does not include the current origin |
| 404 Not Found | Wrong Calendar ID, or calendar not public |
| Dates off by one | Event created as timed instead of all-day, or end date entered inclusive |

## Privacy and limits

- The API key ships in the JavaScript bundle. Restrict it as above; it is not a secret.
- The calendar is public. Anyone with the Calendar ID can read all event details, so keep titles neutral.
- If you need private details in the calendar, switch to a server-side approach (a script or
  Lambda that publishes only date ranges) instead of a public calendar.
- API quota is generous for a small site (1,000,000 requests/day default). Each category
  selection makes one request per room (2-3), cached for the visit.
- Availability is not a lock: two visitors can request the same dates until a booking is
  entered in the calendar.
