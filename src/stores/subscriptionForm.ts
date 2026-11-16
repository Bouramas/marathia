import { defineStore } from 'pinia'
import { ref } from 'vue'

// Shared form state for reservation + contact submissions.
//
// NOTE: submit is intentionally STUBBED. The old site used Quform + Contact
// Form 7; no destination has been chosen for the rebuild yet. Wire a real
// endpoint (3rd-party form service or API) into `submitForm` when decided — the
// seam is the single `endpoint` argument.
export interface ReservationPayload {
  name: string
  email: string
  phone?: string
  date?: string
  guests?: number
  message?: string
}

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  message: string
}

export const useSubscriptionFormStore = defineStore('subscriptionForm', () => {
  const submitting = ref(false)
  const lastSubmitted = ref<ReservationPayload | ContactPayload | null>(null)

  async function submitForm(
    payload: ReservationPayload | ContactPayload,
    endpoint?: string,
  ): Promise<{ ok: boolean }> {
    submitting.value = true
    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        lastSubmitted.value = payload
        return { ok: res.ok }
      }
      // STUB: no endpoint configured — log and simulate success.
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
