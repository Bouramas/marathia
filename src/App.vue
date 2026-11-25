<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import ToastHost from '@/components/ToastHost.vue'
import { notifyViewEntered } from '@/router/scroll'

const route = useRoute()
const main = ref<HTMLElement | null>(null)
let first = true

function onEnter() {
  // Tell the router the new view is in place so it can reset scroll while invisible.
  notifyViewEntered()
  // Move focus to the content for keyboard / screen-reader users (not on first load).
  if (first) {
    first = false
    return
  }
  main.value?.focus({ preventScroll: true })
}
</script>

<template>
  <div class="flex min-h-screen flex-col overflow-x-hidden">
    <AppHeader />
    <main ref="main" tabindex="-1" class="flex-1 outline-none">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in" @enter="onEnter">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
    <ToastHost />
  </div>
</template>
