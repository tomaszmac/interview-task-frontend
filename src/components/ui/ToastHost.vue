<template>
  <div
    class="fixed bottom-6 left-4 right-4 z-10 sm:left-auto sm:w-[360px]"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div
      v-if="store.errorMessage"
      class="flex items-center justify-between gap-4 rounded bg-brand px-4 py-3.5 text-sm leading-5 text-app-surface shadow-toast"
      role="alert"
    >
      <span>{{ store.errorMessage }}</span>
      <button
        type="button"
        class="focus-ring rounded bg-transparent text-xs font-semibold leading-4 text-app-surface transition-colors hover:text-main-light-bg"
        @click="store.dismissError"
      >
        Dismiss
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useTimetableStore } from '@/store/timetableStore';

  const store = useTimetableStore();
</script>
