<template>
  <button
    class="focus-ring inline-flex h-7 w-7 items-center justify-center rounded border border-transparent bg-transparent p-1 transition-colors hover:border-line"
    type="button"
    :aria-label="ariaLabel"
    :title="ariaLabel"
    @click="$emit('toggle')"
  >
    <img
      class="h-4 w-4 transition-transform"
      :class="{ 'rotate-180': direction === 'asc' }"
      src="@/assets/icon-arrow-bottom-rec.svg"
      alt=""
      aria-hidden="true"
    >
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { SortDirection } from '@/types/timetable';

  const props = defineProps<{
    direction: SortDirection;
    label: string;
  }>();

  defineEmits<{
    toggle: [];
  }>();

  const ariaLabel = computed(
    () =>
      `Sort ${props.label} ${
        props.direction === 'asc' ? 'descending' : 'ascending'
      }`
  );
</script>
