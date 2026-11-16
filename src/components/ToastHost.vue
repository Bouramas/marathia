<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToastStore } from '@/stores/toast'

const store = useToastStore()
const { toasts } = storeToRefs(store)

const kindClass: Record<string, string> = {
  success: 'border-brand bg-cream text-ink',
  error: 'border-red-400 bg-red-50 text-red-800',
  info: 'border-ink/20 bg-white text-ink',
}
</script>

<template>
  <div class="fixed bottom-6 right-6 z-50 flex max-w-sm flex-col gap-2">
    <TransitionGroup name="toast">
      <div
        v-for="t in toasts"
        :key="t.id"
        class="rounded-sm border-l-4 px-4 py-3 text-sm shadow-lg"
        :class="kindClass[t.kind]"
        role="status"
      >
        {{ t.message }}
        <button class="ml-3 text-ink/50 hover:text-ink" @click="store.dismiss(t.id)">×</button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.25s ease;
}
.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
