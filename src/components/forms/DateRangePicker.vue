<script setup lang="ts">
// Check-in / check-out range calendar. `booked` = set of booked nights (YYYY-MM-DD);
// a booked day is not a valid check-in, but is a valid check-out if the night before is free.
// Model values are ISO dates (YYYY-MM-DD). Two months side by side from `md`.
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { minNights } from '@/site/stay-rules'

const from = defineModel<string>('from', { default: '' })
const to = defineModel<string>('to', { default: '' })
const props = defineProps<{ error?: string; booked?: Set<string>; loading?: boolean }>()

const { t } = useI18n()
const { locale } = useLocale()

const pad = (n: number) => String(n).padStart(2, '0')
const iso = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const parse = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

const today = iso(new Date())
const view = ref(new Date(new Date().getFullYear(), new Date().getMonth(), 1))
const hover = ref('')

const loc = computed(() => (locale.value === 'el' ? 'el-GR' : 'en-GB'))
const monthFmt = computed(() => new Intl.DateTimeFormat(loc.value, { month: 'long', year: 'numeric' }))
const dayFmt = computed(() => new Intl.DateTimeFormat(loc.value, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }))
const tileFmt = computed(() => new Intl.DateTimeFormat(loc.value, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }))

const weekdays = computed(() => {
  const f = new Intl.DateTimeFormat(loc.value, { weekday: 'short' })
  // 2024-01-01 is a Monday
  return Array.from({ length: 7 }, (_, i) => f.format(new Date(2024, 0, 1 + i)))
})

interface Cell {
  date: string
  day: number
}

function buildMonth(offset: number) {
  const first = new Date(view.value.getFullYear(), view.value.getMonth() + offset, 1)
  const lead = (first.getDay() + 6) % 7 // Monday-first
  const count = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate()
  const cells: (Cell | null)[] = Array(lead).fill(null)
  for (let d = 1; d <= count; d++) {
    cells.push({ date: iso(new Date(first.getFullYear(), first.getMonth(), d)), day: d })
  }
  return { label: monthFmt.value.format(first), cells }
}

const months = computed(() => [buildMonth(0), buildMonth(1)])

const canGoPrev = computed(() => {
  const now = new Date()
  return view.value > new Date(now.getFullYear(), now.getMonth(), 1)
})

function shift(delta: number) {
  view.value = new Date(view.value.getFullYear(), view.value.getMonth() + delta, 1)
}

const isBooked = (date: string) => !!props.booked?.has(date)

// True when every night in [a, b) is free.
function rangeFree(a: string, b: string) {
  if (!props.booked?.size) return true
  for (let d = parse(a); iso(d) < b; d.setDate(d.getDate() + 1)) if (isBooked(iso(d))) return false
  return true
}

const choosingEnd = computed(() => !!from.value && !to.value)

const addDays = (date: string, n: number) => {
  const d = parse(date)
  d.setDate(d.getDate() + n)
  return iso(d)
}

// Earliest valid check-out for the chosen check-in (seasonal minimum stay).
const earliestEnd = computed(() => (from.value ? addDays(from.value, minNights(from.value)) : ''))

// Can this day be clicked in the current state?
function selectable(date: string) {
  if (date < today) return false
  if (choosingEnd.value && date > from.value) return date >= earliestEnd.value && rangeFree(from.value, date)
  // Check-in: must allow at least the minimum stay without hitting a booked night.
  return !isBooked(date) && rangeFree(date, addDays(date, minNights(date)))
}

function pick(date: string) {
  if (!selectable(date)) return
  if (!from.value || (from.value && to.value) || date <= from.value) {
    from.value = date
    to.value = ''
  } else {
    to.value = date
  }
  hover.value = ''
}

function clear() {
  from.value = ''
  to.value = ''
  hover.value = ''
}

// End of the highlighted range: chosen check-out, or the hovered day while choosing.
const rangeEnd = computed(() => to.value || (from.value && hover.value > from.value ? hover.value : ''))

function state(date: string) {
  if (date === from.value) return 'start'
  if (date === to.value) return 'end'
  if (from.value && rangeEnd.value && date > from.value && date < rangeEnd.value) return 'between'
  return ''
}

function cellClass(date: string) {
  const s = state(date)
  if (date < today) return 'cursor-not-allowed text-ink/25 line-through decoration-ink/15'
  if (s !== 'start' && s !== 'end' && !selectable(date)) {
    return isBooked(date) ? 'cursor-not-allowed bg-ink/5 text-ink/30 line-through decoration-ink/20' : 'cursor-not-allowed text-ink/25'
  }
  if (s === 'start' || s === 'end') return 'bg-brand text-white font-semibold'
  if (s === 'between') return 'bg-brand/15 text-ink'
  return 'text-ink hover:bg-brand/10'
}

function rowClass(date: string) {
  // Continuous band behind the range, with rounded outer ends.
  const s = state(date)
  const hasEnd = !!rangeEnd.value
  if (s === 'start' && hasEnd) return 'bg-gradient-to-r from-transparent from-50% to-brand/15 to-50%'
  if (s === 'end') return 'bg-gradient-to-l from-transparent from-50% to-brand/15 to-50%'
  if (s === 'between') return 'bg-brand/15'
  return ''
}

const minHint = computed(() => {
  if (!choosingEnd.value) return ''
  const n = minNights(from.value)
  return n === 1
    ? t('booking.minStayHintOne')
    : t('booking.minStayHint', { n, date: tileFmt.value.format(parse(earliestEnd.value)) })
})

const nights = computed(() =>
  from.value && to.value ? Math.round((parse(to.value).getTime() - parse(from.value).getTime()) / 86400000) : 0,
)
defineExpose({ nights })

const fromLabel = computed(() => (from.value ? tileFmt.value.format(parse(from.value)) : ''))
const toLabel = computed(() => (to.value ? tileFmt.value.format(parse(to.value)) : ''))
</script>

<template>
  <div>
    <!-- Summary tiles -->
    <div class="grid grid-cols-2 gap-3">
      <div
        v-for="tile in [
          { key: 'in', label: t('booking.checkIn'), value: fromLabel, active: !from },
          { key: 'out', label: t('booking.checkOut'), value: toLabel, active: !!from && !to },
        ]"
        :key="tile.key"
        class="border bg-white px-4 py-3 transition-colors"
        :class="tile.active ? 'border-brand' : error && !tile.value ? 'border-red-500' : 'border-ink/20'"
      >
        <p class="label-kicker text-[0.7rem] tracking-[0.25em] text-ink/60">{{ tile.label }}</p>
        <p class="mt-1 text-sm sm:text-base" :class="tile.value ? 'font-semibold text-ink' : 'text-ink/40'">
          {{ tile.value || t('booking.selectDate') }}
        </p>
      </div>
    </div>
    <p v-if="error" class="mt-2 text-xs text-red-600" role="alert">{{ error }}</p>

    <!-- Calendar -->
    <div class="mt-4 border border-ink/10 bg-white p-4 sm:p-6">
      <div class="mb-4 flex items-center justify-between">
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-brand disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:text-ink"
          :disabled="!canGoPrev"
          :aria-label="t('booking.prevMonth')"
          @click="shift(-1)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-5 w-5" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <button
          v-if="from"
          type="button"
          class="label-kicker text-[0.7rem] tracking-[0.2em] text-ink/60 transition-colors hover:text-brand"
          @click="clear"
        >
          {{ t('booking.clearDates') }}
        </button>
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center text-ink transition-colors hover:text-brand"
          :aria-label="t('booking.nextMonth')"
          @click="shift(1)"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" class="h-5 w-5" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div class="grid gap-8 md:grid-cols-2" @mouseleave="hover = ''">
        <div v-for="(m, mi) in months" :key="mi" :class="mi === 1 ? 'hidden md:block' : ''">
          <p class="mb-3 text-center text-sm font-semibold capitalize tracking-wide text-ink">{{ m.label }}</p>
          <div class="grid grid-cols-7 text-center">
            <span v-for="w in weekdays" :key="w" class="label-kicker pb-2 text-[0.65rem] tracking-[0.1em] text-ink/50">{{ w }}</span>
            <template v-for="(c, i) in m.cells" :key="i">
              <span v-if="!c"></span>
              <div v-else class="py-0.5" :class="rowClass(c.date)">
                <button
                  type="button"
                  class="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm transition-colors"
                  :class="[cellClass(c.date), c.date === today && state(c.date) === '' ? 'ring-1 ring-brand/60' : '']"
                  :disabled="!selectable(c.date)"
                  :aria-label="dayFmt.format(parse(c.date))"
                  :aria-pressed="state(c.date) === 'start' || state(c.date) === 'end'"
                  @click="pick(c.date)"
                  @mouseenter="hover = c.date"
                  @focus="hover = c.date"
                >
                  {{ c.day }}
                </button>
              </div>
            </template>
          </div>
        </div>
      </div>

      <p v-if="minHint" class="mt-4 text-center text-sm font-semibold text-ink" aria-live="polite">{{ minHint }}</p>

      <div class="mt-4 border-l-2 border-brand bg-cream/60 p-3 text-xs leading-relaxed text-ink/75">
        <p class="label-kicker mb-1 text-[0.7rem] text-brand">{{ t('booking.minStayTitle') }}</p>
        <p>{{ t('booking.minStayJuneSep') }}</p>
        <p>{{ t('booking.minStayJulyAug') }}</p>
      </div>

      <p v-if="booked?.size" class="mt-4 flex items-center justify-center gap-2 text-xs text-ink/60">
        <span class="inline-block h-3 w-3 rounded-full bg-ink/10" aria-hidden="true"></span>
        {{ t('booking.legendBooked') }}
      </p>

      <p v-if="nights" class="mt-5 border-t border-ink/10 pt-4 text-center text-sm text-ink/70">
        {{ nights === 1 ? t('booking.nightOne', { n: nights }) : t('booking.nightMany', { n: nights }) }}
      </p>
    </div>
  </div>
</template>
