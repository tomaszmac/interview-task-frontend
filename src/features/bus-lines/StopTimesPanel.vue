<template>
  <EmptyState
    v-if="stop === null"
    message="Please select the bus stop first"
  />

  <section
    v-else
    class="flex h-[320px] min-h-0 flex-col overflow-hidden rounded border border-main-universal-darker-bg bg-app-surface sm:h-[444px]"
    aria-labelledby="stop-times-title"
  >
    <div class="flex min-h-14 items-center px-4 pb-2 pt-6 sm:px-6">
      <h2 id="stop-times-title" class="m-0 text-sm font-semibold leading-6 text-ink">
        Bus Stop: {{ stop }}
      </h2>
    </div>

    <TimetableTable aria-label="Departure times for selected stop" heading="Time">
      <tr
        v-for="(time, index) in times"
        :key="`${time}-${index}`"
        class="table h-14 w-full table-fixed border-b border-main-light-bg"
      >
        <td class="px-4 text-xs font-normal leading-4 text-ink-soft sm:px-6">
          {{ time }}
        </td>
      </tr>
    </TimetableTable>
  </section>
</template>

<script setup lang="ts">
  import EmptyState from '@/components/ui/EmptyState.vue';
  import TimetableTable from '@/components/ui/TimetableTable.vue';
  import type { TimeString } from '@/types/timetable';

  defineProps<{
    stop: string | null;
    times: TimeString[];
  }>();
</script>
