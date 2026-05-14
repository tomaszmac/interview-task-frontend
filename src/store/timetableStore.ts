import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import type { StopTimeRecord } from '@/types/timetable';
import { getStops } from '@/api/stopsApi';
import { getSortedBusLines } from '@/domain/timetable';

export const useTimetableStore = defineStore('timetable', () => {
  const records = ref<StopTimeRecord[]>([]);
  const isLoading = ref(false);
  const errorMessage = ref<string | null>(null);
  const hasLoaded = ref(false);

  const busLines = computed(() => getSortedBusLines(records.value));

  async function fetchStops(force = false) {
    if (isLoading.value || (hasLoaded.value && !force)) {
      return;
    }

    isLoading.value = true;
    errorMessage.value = null;

    try {
      records.value = await getStops();
      hasLoaded.value = true;
    } catch {
      errorMessage.value = 'Unable to load timetable data';
    } finally {
      isLoading.value = false;
    }
  }

  function dismissError() {
    errorMessage.value = null;
  }

  return {
    records,
    isLoading,
    errorMessage,
    hasLoaded,
    fetchStops,
    dismissError,
    busLines
  };
});
