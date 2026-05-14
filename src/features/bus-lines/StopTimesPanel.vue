<template>
  <EmptyState
    v-if="stop === null"
    message="Please select the bus stop first"
  />

  <section
    v-else
    class="min-h-[320px] overflow-hidden rounded bg-app-surface sm:min-h-[444px]"
    aria-labelledby="stop-times-title"
  >
    <div class="flex min-h-14 items-center px-4 pb-2 pt-6 sm:px-6">
      <h2 id="stop-times-title" class="m-0 text-sm font-semibold leading-6 text-ink">
        Bus Stop: {{ stop }}
      </h2>
    </div>

    <div
      class="flex min-h-14 items-center justify-between gap-4 border-b border-line px-4 pb-2 pt-6 sm:px-6"
    >
      <h3 class="m-0 text-sm font-semibold leading-6 text-ink">Time</h3>
    </div>

    <ul class="m-0 list-none p-0" aria-label="Departure times for selected stop">
      <li v-for="time in times" :key="time" class="min-h-14 border-b border-line">
        <span
          class="flex min-h-14 w-full items-center px-4 py-4 text-sm font-normal leading-6 text-ink-soft sm:px-6"
        >
          {{ time }}
        </span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
  import EmptyState from '@/components/ui/EmptyState.vue';
  import type { TimeString } from '@/types/timetable';

  defineProps<{
    stop: string | null;
    times: TimeString[];
  }>();
</script>
