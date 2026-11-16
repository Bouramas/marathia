<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSubscriptionFormStore, type ContactPayload } from '@/stores/subscriptionForm'
import { useToastStore } from '@/stores/toast'
import BaseInput from './BaseInput.vue'
import BaseButton from '../BaseButton.vue'

const { t } = useI18n()
const store = useSubscriptionFormStore()
const toast = useToastStore()

const form = reactive<ContactPayload>({ name: '', email: '', phone: '', message: '' })
const errors = reactive<Record<string, string>>({})
const submitting = ref(false)

function validate(): boolean {
  errors.name = form.name.trim() ? '' : t('form.required')
  errors.email = !form.email.trim()
    ? t('form.required')
    : /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)
      ? ''
      : t('form.invalidEmail')
  errors.message = form.message.trim() ? '' : t('form.required')
  return !errors.name && !errors.email && !errors.message
}

async function onSubmit() {
  if (!validate()) return
  submitting.value = true
  const { ok } = await store.submitForm({ ...form })
  submitting.value = false
  if (ok) {
    toast.push(t('form.success'), 'success')
    Object.assign(form, { name: '', email: '', phone: '', message: '' })
  }
}
</script>

<template>
  <form class="mx-auto grid max-w-xl gap-5" novalidate @submit.prevent="onSubmit">
    <div class="grid gap-5 md:grid-cols-2">
      <BaseInput id="c-name" v-model="form.name" :label="t('form.name')" :error="errors.name" required />
      <BaseInput id="c-email" v-model="form.email" type="email" :label="t('form.email')" :error="errors.email" required />
    </div>
    <BaseInput id="c-phone" v-model="form.phone" type="tel" :label="t('form.phone')" />
    <BaseInput id="c-message" v-model="form.message" :label="t('form.message')" :error="errors.message" textarea required />
    <BaseButton type="submit" :disabled="submitting">
      {{ submitting ? t('form.submitting') : t('form.submit') }}
    </BaseButton>
  </form>
</template>
