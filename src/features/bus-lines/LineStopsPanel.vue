<template>
  <EmptyState
    v-if="line === null"
    message="Please select the bus line first"
  />

  <section
    v-else
    class="min-h-[320px] overflow-hidden rounded bg-app-surface sm:min-h-[444px]"
    aria-labelledby="line-stops-title"
  >
    <div class="flex min-h-14 items-center px-4 pb-2 pt-6 sm:px-6">
      <h2 id="line-stops-title" class="m-0 text-sm font-semibold leading-6 text-ink">
        Bus Line: {{ line }}
      </h2>
    </div>

    <div
      class="flex min-h-14 items-center justify-between gap-4 border-b border-line px-4 pb-2 pt-6 sm:px-6"
    >
      <h3 class="m-0 text-sm font-semibold leading-6 text-ink">Bus Stops</h3>
      <SortButton
        :direction="sortDirection"
        label="bus stops"
        @toggle="$emit('toggle-sort')"
      />
    </div>

    <ul class="m-0 list-none p-0" aria-label="Bus stops for selected line">
      <li v-for="stop in stops" :key="stop.name" class="min-h-14 border-b border-line">
        <button
          type="button"
          :class="[
            'flex min-h-14 w-full items-center bg-transparent px-4 py-4 text-left text-sm font-normal leading-6 transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-inset focus-visible:ring-brand/20 sm:px-6',
            stop.name === selectedStop
              ? 'text-brand'
              : 'text-ink-soft hover:text-brand'
          ]"
          @click="$emit('select-stop', stop.name)"
        >
          {{ stop.name }}
        </button>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
  import EmptyState from '@/components/ui/EmptyState.vue';
  import SortButton from '@/components/ui/SortButton.vue';
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
