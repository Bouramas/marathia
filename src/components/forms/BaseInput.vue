<script setup lang="ts">
defineProps<{
  id: string
  label: string
  type?: string
  modelValue: string | number | undefined
  error?: string
  required?: boolean
  textarea?: boolean
}>()
defineEmits<{ (e: 'update:modelValue', value: string): void }>()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label :for="id" class="label-kicker text-xs text-ink/70">
      {{ label }}<span v-if="required" class="text-brand"> *</span>
    </label>
    <textarea
      v-if="textarea"
      :id="id"
      :value="modelValue as string"
      rows="5"
      class="border border-ink/20 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    ></textarea>
    <input
      v-else
      :id="id"
      :type="type || 'text'"
      :value="modelValue"
      class="border border-ink/20 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <p v-if="error" class="text-xs text-red-600">{{ error }}</p>
  </div>
</template>
