<template>
  <div class="flex flex-col gap-4">
    <StopsSearch v-model="searchQuery" />

    <StopsList
      :stops="visibleStops"
      :sort-direction="sortDirection"
      :is-loading="store.isLoading"
      @toggle-sort="toggleSort"
    />
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import StopsList from '@/features/stops/StopsList.vue';
  import StopsSearch from '@/features/stops/StopsSearch.vue';
  import { filterStops, getAllStops } from '@/domain/timetable';
  import { useTimetableStore } from '@/store/timetableStore';
  import type { SortDirection } from '@/types/timetable';

  const store = useTimetableStore();
  const searchQuery = ref('');
  const sortDirection = ref<SortDirection>('asc');

  onMounted(() => {
    store.fetchStops();
  });

  const allStops = computed(() =>
    getAllStops(store.records, sortDirection.value)
  );

  const visibleStops = computed(() =>
    filterStops(allStops.value, searchQuery.value)
  );

  function toggleSort() {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  }
</script>
