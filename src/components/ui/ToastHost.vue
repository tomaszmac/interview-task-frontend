<template>
  <div
    class="fixed bottom-6 left-4 right-4 z-10 sm:left-auto sm:w-[360px]"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div
      v-if="store.errorMessage"
      class="flex items-center justify-between gap-4 rounded bg-slate-800 px-4 py-3.5 text-sm leading-5 text-app-surface shadow-[0_12px_32px_rgba(26,26,26,0.18)]"
      role="alert"
    >
      <span>{{ store.errorMessage }}</span>
      <button
        type="button"
        class="rounded bg-transparent text-xs font-semibold leading-4 text-app-surface transition-colors hover:text-slate-200 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/20"
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
