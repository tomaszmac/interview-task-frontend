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
        :selected-stop="selectedStop"
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
  import type { BusLineNumber, SortDirection } from '@/types/timetable';

  const store = useTimetableStore();
  const selectedLine = ref<BusLineNumber | null>(null);
  const selectedStop = ref<string | null>(null);
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

  const stopTimes = computed(() => {
    if (selectedLine.value === null || selectedStop.value === null) {
      return [];
    }

    return getTimesForStop(
      store.records,
      selectedLine.value,
      selectedStop.value
    );
  });

  function selectLine(line: BusLineNumber) {
    selectedLine.value = line;
    selectedStop.value = null;
    stopsSortDirection.value = 'asc';
  }

  function selectStop(stopName: string) {
    selectedStop.value = stopName;
  }

  function toggleStopsSort() {
    stopsSortDirection.value =
      stopsSortDirection.value === 'asc' ? 'desc' : 'asc';
  }
</script>
