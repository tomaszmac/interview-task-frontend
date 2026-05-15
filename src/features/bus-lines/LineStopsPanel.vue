<template>
  <EmptyState
    v-if="line === null"
    message="Please select the bus line first"
  />

  <section
    v-else
    class="flex h-[320px] min-h-0 flex-col overflow-hidden rounded border border-main-universal-darker-bg bg-app-surface sm:h-[444px]"
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
      <tr
        v-for="stop in stops"
        :key="stop.key"
        class="table h-14 w-full table-fixed border-b border-main-light-bg"
      >
        <td class="p-0">
          <button
            type="button"
            :aria-current="stop.key === selectedStopKey ? 'true' : undefined"
            :class="[
              'focus-ring flex h-14 w-full items-center bg-transparent px-4 text-left text-xs font-normal leading-4 transition-colors sm:px-6',
              stop.key === selectedStopKey
                ? 'text-brand'
                : 'text-ink-soft hover:text-brand'
            ]"
            @click="$emit('select-stop', stop.key)"
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
    RouteStop,
    RouteStopKey,
    SortDirection
  } from '@/types/timetable';

  defineProps<{
    line: BusLineNumber | null;
    stops: RouteStop[];
    selectedStopKey: RouteStopKey | null;
    sortDirection: SortDirection;
  }>();

  defineEmits<{
    'toggle-sort': [];
    'select-stop': [stopKey: RouteStopKey];
  }>();
</script>
