<template>
  <section class="rounded bg-app-surface" aria-labelledby="line-list-title">
    <div class="flex min-h-14 items-center px-4 pb-2 pt-6 sm:px-6">
      <h2 id="line-list-title" class="m-0 text-sm font-semibold leading-6 text-ink">
        Select Bus Line
      </h2>
    </div>

    <LoadingState v-if="isLoading" label="Loading bus lines" />

    <ul
      v-else
      class="m-0 flex min-h-28 list-none flex-wrap gap-2 p-4 sm:min-h-40 sm:p-6"
      aria-label="Bus lines"
    >
      <li v-for="line in lines" :key="line">
        <button
          type="button"
          class="inline-flex h-8 min-w-[54px] items-center justify-center rounded px-4 py-2 text-xs font-medium leading-4 text-app-surface transition-colors active:bg-brand-active focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/20"
          :class="line === selectedLine ? 'bg-brand-hover' : 'bg-brand hover:bg-brand-hover'"
          :aria-pressed="line === selectedLine"
          @click="$emit('select-line', line)"
        >
          {{ line }}
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
  import LoadingState from '@/components/ui/LoadingState.vue';
  import type { BusLineNumber } from '@/types/timetable';

  defineProps<{
    lines: BusLineNumber[];
    selectedLine: BusLineNumber | null;
    isLoading: boolean;
  }>();

  defineEmits<{
    'select-line': [line: BusLineNumber];
  }>();
</script>
