<template>
  <section
    class="min-h-[520px] overflow-hidden rounded bg-app-surface"
    aria-labelledby="all-stops-title"
  >
    <div
      class="flex min-h-14 items-center justify-between gap-4 border-b border-line px-4 pb-2 pt-6 sm:px-6"
    >
      <h2 id="all-stops-title" class="m-0 text-sm font-semibold leading-6 text-ink">
        Bus Stops
      </h2>
      <SortButton
        :direction="sortDirection"
        label="bus stops"
        @toggle="$emit('toggle-sort')"
      />
    </div>

    <LoadingState v-if="isLoading" label="Loading bus stops" />

    <p v-else-if="stops.length === 0" class="m-0 p-6 text-sm leading-6 text-ink-muted">
      No bus stops found
    </p>

    <ul v-else class="m-0 list-none p-0" aria-label="All bus stops">
      <li v-for="stop in stops" :key="stop.name" class="min-h-14 border-b border-line">
        <span
          class="flex min-h-14 w-full items-center px-4 py-4 text-sm font-normal leading-6 text-ink-soft sm:px-6"
        >
          {{ stop.name }}
        </span>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
  import LoadingState from '@/components/ui/LoadingState.vue';
  import SortButton from '@/components/ui/SortButton.vue';
  import type { BusStop, SortDirection } from '@/types/timetable';

  defineProps<{
    stops: BusStop[];
    sortDirection: SortDirection;
    isLoading: boolean;
  }>();

  defineEmits(['toggle-sort']);
</script>
