<script setup lang="ts">
// Guesthouse booking REQUEST form. submit goes through the subscriptionForm
// store (Web3Forms, key from VITE_WEB3FORMS_KEY). The host confirms and arranges payment.
import { computed, reactive, ref, toRef, watch, type Ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useSubscriptionFormStore, type BookingPayload } from '@/stores/subscriptionForm'
import { useToastStore } from '@/stores/toast'
import { useLocale } from '@/composables/useLocale'
import { pathForKey } from '@/composables/usePages'
import BaseInput from './BaseInput.vue'
import BaseButton from '../BaseButton.vue'
import DateRangePicker from './DateRangePicker.vue'
import { useAvailability } from '@/composables/useAvailability'
import { minNights } from '@/site/stay-rules'
import { ROOM_CATEGORIES, EXTRA_CHILD_MAX_AGE, categoryById, fitsCategory, unitById } from '@/site/rooms'

const { t } = useI18n()
const { locale, pick } = useLocale()
const route = useRoute()
const store = useSubscriptionFormStore()
const toast = useToastStore()

const blank = (): BookingPayload => ({
  from: '',
  to: '',
  adults: 2,
  children: 0,
  room: '',
  unit: '',
  name: '',
  email: '',
  phone: '',
  arrivalTime: '',
  message: '',
  interestedInExperiences: false,
  consent: false,
})

const form = reactive<BookingPayload>(blank())
const { booked, loading, error: availabilityError } = useAvailability(toRef(form, 'unit') as Ref<string>)
const hasUnit = computed(() => !!form.unit)

// Guests come first: only categories whose beds fit the party are offered.
const guestCount = computed(() => form.adults + form.children)
const fitting = computed(() => ROOM_CATEGORIES.filter((c) => fitsCategory(c, form.adults, form.children)))
const category = computed(() => categoryById(form.room))
const unitInfo = computed(() => unitById(form.unit))

watch([() => form.adults, () => form.children], () => {
  if (form.room && !fitting.value.some((c) => c.id === form.room)) form.room = ''
  if (!form.room && fitting.value.length === 1) form.room = fitting.value[0].id
})
// A different category invalidates the chosen room; a different room invalidates the dates
// (each room has its own calendar).
watch(() => form.room, (id) => {
  if (form.unit && unitById(form.unit)?.category.id !== id) form.unit = ''
})
watch(() => form.unit, () => {
  form.from = ''
  form.to = ''
})

// "Book this room" links from the room pages: /booking?room=junior-2
const preset = unitById(String(route.query.room ?? ''))
if (preset && fitsCategory(preset.category, form.adults, form.children)) {
  form.room = preset.category.id
  form.unit = preset.unit.id
}
const errors = reactive<Record<string, string>>({})
const submitting = ref(false)
const sent = ref<BookingPayload | null>(null)

const nights = computed(() =>
  form.from && form.to
    ? Math.round((new Date(form.to).getTime() - new Date(form.from).getTime()) / 86400000)
    : 0,
)
const nightsLabel = computed(() =>
  nights.value === 1 ? t('booking.nightOne', { n: 1 }) : t('booking.nightMany', { n: nights.value }),
)
const dateFmt = computed(
  () => new Intl.DateTimeFormat(locale.value === 'el' ? 'el-GR' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
)
const fmt = (s: string) => dateFmt.value.format(new Date(s))
const roomLabel = computed(() => {
  const r = unitInfo.value
  return r ? `${t(r.category.labelKey)} · ${pick(r.unit.label)}` : '—'
})

function step(field: 'adults' | 'children', delta: number) {
  const min = field === 'adults' ? 1 : 0
  form[field] = Math.min(10, Math.max(min, form[field] + delta))
}

function validate(): boolean {
  errors.room = form.room ? '' : t('booking.errRoom')
  errors.unit = form.unit ? '' : t('booking.errUnit')
  const min = form.from ? minNights(form.from) : 1
  errors.dates = !(form.from && form.to)
    ? t('booking.errDates')
    : nights.value < min
      ? t('booking.errMinStay', { n: min })
      : ''
  errors.name = form.name.trim() ? '' : t('booking.errName')
  errors.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) ? '' : t('booking.errEmail')
  errors.phone = form.phone.trim().length >= 6 ? '' : t('booking.errPhone')
  errors.consent = form.consent ? '' : t('booking.errConsent')
  return !Object.values(errors).some(Boolean)
}

async function onSubmit() {
  if (!validate()) {
    document.querySelector('[aria-invalid="true"], [role="alert"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    return
  }
  submitting.value = true
  const yn = (b?: boolean) => (b ? 'Yes' : 'No')
  const summary = [
    '',
    `Room:         ${roomLabel.value}${unitInfo.value ? ` (${pick(unitInfo.value.unit.beds)})` : ''}`,
    `Check-in:     ${fmt(form.from)}`,
    `Check-out:    ${fmt(form.to)}`,
    `Nights:       ${nights.value}`,
    `Guests:       ${form.adults} adult(s), ${form.children} child(ren)`,
    '',
    `Name:         ${form.name}`,
    `Email:        ${form.email}`,
    `Phone:        ${form.phone}`,
    `Arrival time: ${form.arrivalTime || '-'}`,
    `Experiences:  ${yn(form.interestedInExperiences)}`,
    `Language:     ${locale.value}`,
    '',
    'Message:',
    form.message?.trim() || '-',
  ].join('\n')
  const { ok } = await store.submitForm({ ...form }, undefined, {
    booking_summary: summary,
  })
  submitting.value = false
  if (ok) {
    sent.value = { ...form }
    toast.push(t('form.success'), 'success')
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  } else {
    toast.push(t('booking.submitError'), 'error', 8000)
  }
}

function reset() {
  Object.assign(form, blank())
  Object.keys(errors).forEach((k) => (errors[k] = ''))
  sent.value = null
}

const inputBox =
  'border border-ink/20 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none'
</script>

<template>
  <div class="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-14">
    <!-- Thank-you panel -->
    <div v-if="sent" class="bg-cream p-8 text-center sm:p-12">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" class="mx-auto h-12 w-12 text-brand" aria-hidden="true">
        <circle cx="12" cy="12" r="10" /><path d="M7.5 12.5l3 3 6-6.5" />
      </svg>
      <h2 class="display mt-6 text-2xl tracking-[0.1em] sm:text-3xl md:tracking-[0.25em]">{{ t('booking.thanksTitle') }}</h2>
      <p class="mx-auto mt-5 max-w-md leading-relaxed text-ink/80">
        {{ t('booking.thanksBody', { email: sent.email }) }}
      </p>
      <p class="mt-6 text-sm font-semibold text-ink">
        {{ fmt(sent.from) }} &rarr; {{ fmt(sent.to) }}
      </p>
      <div class="mt-8">
        <BaseButton variant="outline" @click="reset">{{ t('booking.another') }}</BaseButton>
      </div>
    </div>

    <form v-else class="grid gap-12" novalidate @submit.prevent="onSubmit">
      <!-- 01 Guests -->
      <section>
        <p class="label-kicker mb-3 flex items-baseline gap-5 text-brand">
          <span>01</span><span class="text-ink">{{ t('booking.stepGuests') }}</span>
        </p>
        <p class="mb-6 text-sm text-ink/70">{{ t('booking.guestsLead') }}</p>
        <div class="grid gap-5 sm:grid-cols-2">
          <div v-for="g in [
            { f: 'adults' as const, label: t('booking.adults'), hint: '' },
            { f: 'children' as const, label: t('booking.children'), hint: t('booking.childrenHint') },
          ]" :key="g.f" class="flex items-center justify-between border border-ink/20 bg-white px-4 py-3">
            <div>
              <p class="label-kicker text-[0.7rem] tracking-[0.25em] text-ink/70">{{ g.label }}</p>
              <p v-if="g.hint" class="text-xs text-ink/50">{{ g.hint }}</p>
            </div>
            <div class="flex items-center gap-3">
              <button
                type="button"
                class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-brand text-brand transition-colors hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand"
                :aria-label="`${t('booking.decrease')}: ${g.label}`"
                :disabled="form[g.f] <= (g.f === 'adults' ? 1 : 0)"
                @click="step(g.f, -1)"
              >&minus;</button>
              <span class="w-5 text-center font-semibold" aria-live="polite">{{ form[g.f] }}</span>
              <button
                type="button"
                class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-brand text-brand transition-colors hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-brand"
                :aria-label="`${t('booking.increase')}: ${g.label}`"
                :disabled="form[g.f] >= 10"
                @click="step(g.f, 1)"
              >+</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 02 Room -->
      <section>
        <p class="label-kicker mb-6 flex items-baseline gap-5 text-brand">
          <span>02</span><span class="text-ink">{{ t('booking.stepRoom') }}</span>
        </p>

        <div v-if="!fitting.length" class="border-l-2 border-brand bg-cream p-5 sm:p-6" role="status">
          <p class="label-kicker mb-1 text-xs text-brand">{{ t('booking.noFitTitle') }}</p>
          <p class="leading-relaxed text-ink/80">{{ t('booking.noFitBody', { n: guestCount }) }}</p>
          <RouterLink :to="pathForKey('contact-us', locale) || '#'" class="mt-3 inline-block text-sm font-semibold text-brand underline-offset-2 hover:underline">
            {{ t('booking.noFitLink') }} &rarr;
          </RouterLink>
        </div>

        <template v-else>
          <p class="label-kicker mb-3 text-xs text-ink/60">{{ t('booking.pickCategory') }}</p>
          <fieldset>
            <legend class="sr-only">{{ t('booking.pickCategory') }}</legend>
            <div class="grid gap-3 sm:grid-cols-3">
              <label
                v-for="r in fitting"
                :key="r.id"
                class="flex cursor-pointer items-start gap-3 border bg-white px-4 py-3 transition-colors hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand/5"
                :class="form.room === r.id ? 'border-brand' : 'border-ink/20'"
              >
                <input v-model="form.room" type="radio" name="room" :value="r.id" class="mt-1 cursor-pointer accent-[#c9a15b]" />
                <span class="flex-1">
                  <span class="block text-sm font-semibold">{{ t(r.labelKey) }}</span>
                  <span class="mt-0.5 block text-xs text-ink/60">
                    {{ r.extraChild ? t('booking.sleepsExtra', { n: r.sleeps, age: EXTRA_CHILD_MAX_AGE }) : t('booking.sleeps', { n: r.sleeps }) }}
                    &middot; {{ t('booking.roomsCount', { n: r.rooms.length }) }}
                  </span>
                  <RouterLink
                    v-if="pathForKey(r.pageKey, locale)"
                    :to="pathForKey(r.pageKey, locale)!"
                    target="_blank"
                    class="mt-2 inline-block rounded-sm bg-brand/15 px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-brand/30"
                    @click.stop
                  >{{ t('booking.viewRoom') }} &rarr;</RouterLink>
                </span>
              </label>
            </div>
          </fieldset>
          <p v-if="errors.room" class="mt-2 text-xs text-red-600" role="alert">{{ errors.room }}</p>

          <div v-if="category" class="mt-8">
            <p class="label-kicker mb-3 text-xs text-ink/60">{{ t('booking.pickRoom') }}</p>
            <fieldset>
              <legend class="sr-only">{{ t('booking.pickRoom') }}</legend>
              <div class="grid gap-3 sm:grid-cols-3">
                <label
                  v-for="u in category.rooms"
                  :key="u.id"
                  class="flex cursor-pointer items-start gap-3 border bg-white px-4 py-3 transition-colors hover:border-brand has-[:checked]:border-brand has-[:checked]:bg-brand/5"
                  :class="form.unit === u.id ? 'border-brand' : 'border-ink/20'"
                >
                  <input v-model="form.unit" type="radio" name="unit" :value="u.id" class="mt-1 cursor-pointer accent-[#c9a15b]" />
                  <span class="flex-1">
                    <span class="block text-sm font-semibold">{{ pick(u.label) }}</span>
                    <span class="mt-0.5 block text-xs text-ink/60">{{ pick(u.beds) }}</span>
                  </span>
                </label>
              </div>
            </fieldset>
            <p v-if="category.extraChild" class="mt-3 text-xs text-ink/60">{{ t('booking.couchChildNote', { age: EXTRA_CHILD_MAX_AGE }) }}</p>
            <p v-if="errors.unit" class="mt-2 text-xs text-red-600" role="alert">{{ errors.unit }}</p>
          </div>
        </template>
      </section>

      <!-- 03 Dates -->
      <section>
        <p class="label-kicker mb-6 flex items-baseline gap-5 text-brand">
          <span>03</span><span class="text-ink">{{ t('booking.stepStay') }}</span>
        </p>
        <p v-if="!hasUnit" class="mb-4 text-sm text-ink/60">{{ t('booking.selectRoomFirst') }}</p>
        <div :class="hasUnit ? '' : 'pointer-events-none select-none opacity-40'" :inert="!hasUnit" :aria-busy="loading">
          <DateRangePicker v-model:from="form.from" v-model:to="form.to" :booked="booked" :loading="loading" :error="errors.dates" />
          <p v-if="loading" class="mt-2 text-xs text-ink/60" aria-live="polite">{{ t('booking.loadingAvailability') }}</p>
          <div v-else-if="availabilityError" class="mt-4 border-l-2 border-red-600 bg-red-50 p-4 sm:p-5" role="alert">
            <p class="label-kicker mb-1 text-xs text-red-700">{{ t('booking.availabilityErrorTitle') }}</p>
            <p class="text-sm leading-relaxed text-red-900/80">{{ t('booking.availabilityError') }}</p>
          </div>
        </div>
      </section>

      <!-- 04 Details -->
      <section>
        <p class="label-kicker mb-6 flex items-baseline gap-5 text-brand">
          <span>04</span><span class="text-ink">{{ t('booking.stepDetails') }}</span>
        </p>
        <div class="grid gap-5 sm:grid-cols-2">
          <BaseInput id="b-name" v-model="form.name" :label="t('booking.name')" :error="errors.name" required />
          <BaseInput id="b-email" v-model="form.email" type="email" :label="t('booking.email')" :error="errors.email" required />
          <BaseInput id="b-phone" v-model="form.phone" type="tel" :label="t('booking.phone')" :error="errors.phone" required />
          <div class="flex flex-col gap-1.5">
            <label for="b-arrival" class="label-kicker text-xs text-ink/70">{{ t('booking.arrivalTime') }}</label>
            <input id="b-arrival" v-model="form.arrivalTime" type="time" :class="inputBox" />
          </div>
        </div>
        <div class="mt-5">
          <label for="b-message" class="label-kicker mb-1.5 block text-xs text-ink/70">{{ t('booking.message') }}</label>
          <textarea
            id="b-message"
            v-model="form.message"
            rows="4"
            :placeholder="t('booking.messagePlaceholder')"
            :class="[inputBox, 'w-full']"
          ></textarea>
        </div>
        <label class="mt-5 flex cursor-pointer items-start gap-3 text-sm text-ink/80">
          <input v-model="form.interestedInExperiences" type="checkbox" class="mt-1 cursor-pointer accent-[#c9a15b]" />
          <span>{{ t('booking.experiences') }}</span>
        </label>
      </section>

      <!-- 05 Send -->
      <section>
        <p class="label-kicker mb-6 flex items-baseline gap-5 text-brand">
          <span>05</span><span class="text-ink">{{ t('booking.stepSend') }}</span>
        </p>
        <div class="border-l-2 border-brand bg-cream p-5 sm:p-6">
          <p class="label-kicker mb-2 text-xs text-brand">{{ t('booking.noticeTitle') }}</p>
          <p class="leading-relaxed text-ink/80">{{ t('booking.notice') }}</p>
          <p class="mt-2 text-sm font-semibold text-ink">{{ t('booking.noPayment') }}</p>
        </div>
        <label class="mt-6 flex cursor-pointer items-start gap-3 text-sm text-ink/80">
          <input v-model="form.consent" type="checkbox" class="mt-1 cursor-pointer accent-[#c9a15b]" :aria-invalid="!!errors.consent" />
          <span>{{ t('booking.consent') }}<span class="text-brand"> *</span></span>
        </label>
        <p v-if="errors.consent" class="mt-1 text-xs text-red-600" role="alert">{{ errors.consent }}</p>
        <div class="mt-8">
          <BaseButton type="submit" :disabled="submitting">
            {{ submitting ? t('booking.submitting') : t('booking.submit') }}
          </BaseButton>
        </div>
      </section>
    </form>

    <!-- Aside -->
    <aside class="grid gap-8 lg:sticky lg:top-28">
      <!-- Framed arched image, same treatment as the homepage bands -->
      <div class="relative mx-auto hidden w-full max-w-[300px] lg:block">
        <div aria-hidden="true" class="absolute -right-5 top-5 h-full w-full rounded-t-[999px] rounded-b-sm border border-brand/60"></div>
        <div class="relative overflow-hidden rounded-t-[999px] rounded-b-sm">
          <img src="/assets/uploads/2024/12/rooms-in-800x451_DSC3501.jpg" alt="" loading="lazy" class="aspect-[3/4] w-full object-cover" />
        </div>
      </div>

      <div class="bg-cream p-6 sm:p-8">
        <p class="label-kicker mb-5 text-brand">{{ t('booking.summary') }}</p>
        <dl v-if="form.from" class="space-y-3 text-sm">
          <div class="flex justify-between gap-4">
            <dt class="text-ink/60">{{ t('booking.checkIn') }}</dt>
            <dd class="font-semibold">{{ fmt(form.from) }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-ink/60">{{ t('booking.checkOut') }}</dt>
            <dd class="font-semibold">{{ form.to ? fmt(form.to) : '—' }}</dd>
          </div>
          <div v-if="nights" class="flex justify-between gap-4">
            <dt class="text-ink/60">&nbsp;</dt>
            <dd class="font-semibold">{{ nightsLabel }}</dd>
          </div>
          <div class="flex justify-between gap-4 border-t border-ink/10 pt-3">
            <dt class="text-ink/60">{{ t('booking.guests') }}</dt>
            <dd class="text-right font-semibold">{{ t('booking.guestsSummary', { a: form.adults, c: form.children }) }}</dd>
          </div>
          <div class="flex justify-between gap-4">
            <dt class="text-ink/60">{{ t('booking.room') }}</dt>
            <dd class="text-right font-semibold">{{ roomLabel }}</dd>
          </div>
        </dl>
        <p v-else class="text-sm text-ink/60">{{ t('booking.summaryEmpty') }}</p>
        <p class="mt-6 hidden border-t border-ink/10 pt-4 text-xs leading-relaxed text-ink/70 lg:block">{{ t('booking.notice') }}</p>
      </div>

      <div>
        <p class="label-kicker mb-4 text-brand">{{ t('booking.goodToKnow') }}</p>
        <ul class="space-y-2 border-t border-ink/15 text-sm text-ink/80">
          <li v-for="k in ['info1', 'info2', 'info3', 'info4']" :key="k" class="border-b border-ink/15 py-3">{{ t(`booking.${k}`) }}</li>
        </ul>
        <p class="mt-5 text-sm text-ink/80">
          {{ t('booking.questions') }}:
          <a href="tel:+302283023249" class="font-semibold transition-colors hover:text-brand">+30 22830 23249</a>
        </p>
      </div>
    </aside>
  </div>
</template>
