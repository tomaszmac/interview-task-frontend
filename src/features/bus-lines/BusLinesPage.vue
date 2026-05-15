<template>
  <div class="flex flex-col gap-4">
    <LineList
      :lines="store.busLines"
      :selected-line="selectedLine"
      :is-loading="store.isLoading"
      @select-line="selectLine"
    />

    <div class="grid min-h-[444px] grid-cols-1 gap-4 min-[900px]:grid-cols-2">
      <LineStopsPanel
        :line="selectedLine"
        :stops="lineStops"
        :selected-stop-key="selectedStopKey"
        :sort-direction="stopsSortDirection"
        @toggle-sort="toggleStopsSort"
        @select-stop="selectStop"
      />

      <StopTimesPanel :stop="selectedStop" :times="stopTimes" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import LineList from '@/features/bus-lines/LineList.vue';
  import LineStopsPanel from '@/features/bus-lines/LineStopsPanel.vue';
  import StopTimesPanel from '@/features/bus-lines/StopTimesPanel.vue';
  import {
    getStopsForLine,
    getTimesForStop
  } from '@/domain/timetable';
  import { useTimetableStore } from '@/store/timetableStore';
  import type {
    BusLineNumber,
    RouteStopKey,
    SortDirection
  } from '@/types/timetable';

  const store = useTimetableStore();
  const selectedLine = ref<BusLineNumber | null>(null);
  const selectedStopKey = ref<RouteStopKey | null>(null);
  const stopsSortDirection = ref<SortDirection>('asc');

  onMounted(() => {
    store.fetchStops();
  });

  const lineStops = computed(() => {
    if (selectedLine.value === null) {
      return [];
    }

    return getStopsForLine(
      store.records,
      selectedLine.value,
      stopsSortDirection.value
    );
  });

  const selectedStop = computed(() => {
    if (selectedStopKey.value === null) {
      return null;
    }

    return lineStops.value.find((stop) => stop.key === selectedStopKey.value)
      ?.name ?? null;
  });

  const stopTimes = computed(() => {
    if (selectedLine.value === null || selectedStopKey.value === null) {
      return [];
    }

    return getTimesForStop(
      store.records,
      selectedLine.value,
      selectedStopKey.value
    );
  });

  function selectLine(line: BusLineNumber) {
    selectedLine.value = line;
    selectedStopKey.value = null;
    stopsSortDirection.value = 'asc';
  }

  function selectStop(stopKey: RouteStopKey) {
    selectedStopKey.value = stopKey;
  }

  function toggleStopsSort() {
    stopsSortDirection.value =
      stopsSortDirection.value === 'asc' ? 'desc' : 'asc';
  }
</script>
