import { defineStore } from 'pinia'
import { ref } from 'vue'

// Shared form state for reservation + contact submissions.
//
// Submissions go to Web3Forms when `VITE_WEB3FORMS_KEY` is set; otherwise (or with no
// `endpoint`) the submit is a logged stub. A custom `endpoint` posts JSON instead.
export interface ReservationPayload {
  name: string
  email: string
  phone?: string
  date?: string
  guests?: number
  message?: string
}

export interface BookingPayload {
  from: string
  to: string
  adults: number
  children: number
  room: string
  name: string
  email: string
  phone: string
  arrivalTime?: string
  message?: string
  interestedInExperiences?: boolean
  consent: boolean
}

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  message: string
}

const WEB3FORMS_URL = 'https://api.web3forms.com/submit'

function isBooking(p: object): p is BookingPayload {
  return 'from' in p && 'to' in p
}

// Builds the Web3Forms body: every payload field plus the human-readable `extra` fields
// (labels, formatted dates...). Empty values are sent as "-", booleans as Yes/No.
function toWeb3Forms(
  accessKey: string,
  payload: ReservationPayload | ContactPayload | BookingPayload,
  extra: Record<string, string>,
): FormData {
  const fd = new FormData()
  fd.append('access_key', accessKey)
  fd.append('subject', isBooking(payload) ? 'Booking request - Marathia Tinos' : 'Marathia Tinos form')
  fd.append('from_name', payload.name)
  fd.append('replyto', payload.email)
  const fmt = (v: unknown) =>
    typeof v === 'boolean' ? (v ? 'Yes' : 'No') : v === undefined || v === '' ? '-' : String(v)
  // Bookings send only the pre-formatted `booking_summary` (built in ReservationForm).
  const fields = isBooking(payload) ? { booking_summary: extra.booking_summary } : { ...payload, ...extra }
  for (const [k, v] of Object.entries(fields)) fd.append(k, fmt(v))
  return fd
}

export const useSubscriptionFormStore = defineStore('subscriptionForm', () => {
  const submitting = ref(false)
  const lastSubmitted = ref<ReservationPayload | ContactPayload | BookingPayload | null>(null)

  async function submitForm(
    payload: ReservationPayload | ContactPayload | BookingPayload,
    endpoint?: string,
    extra: Record<string, string> = {},
  ): Promise<{ ok: boolean }> {
    submitting.value = true
    try {
      const accessKey = import.meta.env.VITE_WEB3FORMS_KEY
      if (!endpoint && accessKey) {
        try {
          const res = await fetch(WEB3FORMS_URL, { method: 'POST', body: toWeb3Forms(accessKey, payload, extra) })
          const data = await res.json()
          const ok = res.ok && data.success !== false
          if (ok) lastSubmitted.value = payload
          else console.error('[subscriptionForm] Web3Forms error:', data.message)
          return { ok }
        } catch (e) {
          console.error('[subscriptionForm] Web3Forms request failed:', e)
          return { ok: false }
        }
      }
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        lastSubmitted.value = payload
        return { ok: res.ok }
      }
      // STUB: no endpoint or VITE_WEB3FORMS_KEY configured — log and simulate success.
      await new Promise((r) => setTimeout(r, 500))
      // eslint-disable-next-line no-console
      console.info('[subscriptionForm] stubbed submit (no endpoint):', payload)
      lastSubmitted.value = payload
      return { ok: true }
    } finally {
      submitting.value = false
    }
  }

  return { submitting, lastSubmitted, submitForm }
})
