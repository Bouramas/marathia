<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSubscriptionFormStore, type ReservationPayload } from '@/stores/subscriptionForm'
import { useToastStore } from '@/stores/toast'
import BaseInput from './BaseInput.vue'
import BaseButton from '../BaseButton.vue'

const { t } = useI18n()
const store = useSubscriptionFormStore()
const toast = useToastStore()

const form = reactive<ReservationPayload>({ name: '', email: '', phone: '', date: '', guests: 2, message: '' })
const errors = reactive<Record<string, string>>({})
const submitting = ref(false)

function validate(): boolean {
  errors.name = form.name.trim() ? '' : t('form.required')
  errors.email = !form.email.trim()
    ? t('form.required')
    : /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)
      ? ''
      : t('form.invalidEmail')
  return !errors.name && !errors.email
}

async function onSubmit() {
  if (!validate()) return
  submitting.value = true
  // Submit is stubbed in the store until a form destination is chosen.
  const { ok } = await store.submitForm({ ...form })
  submitting.value = false
  if (ok) {
    toast.push(t('form.success'), 'success')
    Object.assign(form, { name: '', email: '', phone: '', date: '', guests: 2, message: '' })
  }
}
</script>

<template>
  <form class="mx-auto grid max-w-xl gap-5" novalidate @submit.prevent="onSubmit">
    <div class="grid gap-5 md:grid-cols-2">
      <BaseInput id="r-name" v-model="form.name" :label="t('form.name')" :error="errors.name" required />
      <BaseInput id="r-email" v-model="form.email" type="email" :label="t('form.email')" :error="errors.email" required />
      <BaseInput id="r-phone" v-model="form.phone" type="tel" :label="t('form.phone')" />
      <BaseInput id="r-date" v-model="form.date" type="date" :label="t('form.date')" />
    </div>
    <BaseInput id="r-guests" v-model="form.guests" type="number" :label="t('form.guests')" />
    <BaseInput id="r-message" v-model="form.message" :label="t('form.message')" textarea />
    <BaseButton type="submit" :disabled="submitting">
      {{ submitting ? t('form.submitting') : t('form.submit') }}
    </BaseButton>
  </form>
</template>
