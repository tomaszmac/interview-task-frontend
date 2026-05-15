<template>
  <EmptyState
    v-if="line === null"
    message="Please select the bus line first"
  />

  <section
    v-else
    class="min-h-[320px] overflow-auto rounded border border-main-universal-darker-bg bg-app-surface sm:h-[444px] sm:min-h-0"
    aria-labelledby="line-stops-title"
  >
    <div class="flex min-h-14 items-center px-4 pb-2 pt-6 sm:px-6">
      <h2 id="line-stops-title" class="m-0 text-sm font-semibold leading-6 text-ink">
        Bus Line: {{ line }}
      </h2>
    </div>

    <TimetableTable
      aria-label="Bus stops for selected line"
      heading="Bus Stops"
      sort-label="bus stops"
      :sort-direction="sortDirection"
      strong-header-border
      @toggle-sort="$emit('toggle-sort')"
    >
      <tr v-for="stop in stops" :key="stop.name" class="h-14 border-b border-main-light-bg">
        <td class="p-0">
          <button
            type="button"
            :aria-current="stop.name === selectedStop ? 'true' : undefined"
            :class="[
              'focus-ring flex h-14 w-full items-center bg-transparent px-4 text-left text-xs font-normal leading-4 transition-colors sm:px-6',
              stop.name === selectedStop
                ? 'text-brand'
                : 'text-ink-soft hover:text-brand'
            ]"
            @click="$emit('select-stop', stop.name)"
          >
            {{ stop.name }}
          </button>
        </td>
      </tr>
    </TimetableTable>
  </section>
</template>

<script setup lang="ts">
  import EmptyState from '@/components/ui/EmptyState.vue';
  import TimetableTable from '@/components/ui/TimetableTable.vue';
  import type {
    BusLineNumber,
    BusStop,
    SortDirection
  } from '@/types/timetable';

  defineProps<{
    line: BusLineNumber | null;
    stops: BusStop[];
    selectedStop: string | null;
    sortDirection: SortDirection;
  }>();

  defineEmits<{
    'toggle-sort': [];
    'select-stop': [stopName: string];
  }>();
</script>
