<template>
  <section
    class="-mx-4 mt-4 min-h-0 flex-1 overflow-y-auto bg-app-surface"
    aria-labelledby="all-stops-title"
  >
    <h2 id="all-stops-title" class="sr-only">Bus Stops</h2>

    <LoadingState v-if="isLoading" label="Loading bus stops" />

    <p v-else-if="stops.length === 0" class="m-0 p-6 text-sm leading-6 text-ink-muted">
      No bus stops found
    </p>

    <TimetableTable
      v-else
      aria-label="All bus stops"
      heading="Bus Stops"
      sort-label="bus stops"
      :sort-direction="sortDirection"
      strong-header-border
      @toggle-sort="$emit('toggle-sort')"
    >
      <tr
        v-for="stop in stops"
        :key="stop.name"
        class="h-14 border-b border-main-light-bg last:border-b-0"
      >
        <td class="px-4 text-xs font-normal leading-4 text-ink-soft sm:px-6">
          {{ stop.name }}
        </td>
      </tr>
    </TimetableTable>
  </section>
</template>

<script setup lang="ts">
  import LoadingState from '@/components/ui/LoadingState.vue';
  import TimetableTable from '@/components/ui/TimetableTable.vue';
  import type { BusStop, SortDirection } from '@/types/timetable';

  defineProps<{
    stops: BusStop[];
    sortDirection: SortDirection;
    isLoading: boolean;
  }>();

  defineEmits<{
    'toggle-sort': [];
  }>();
</script>
