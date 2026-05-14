<template>
  <button
    class="inline-flex min-h-8 min-w-11 items-center justify-center rounded border border-transparent bg-transparent px-2 py-1 text-[11px] font-semibold leading-4 text-ink-muted transition-colors hover:border-line hover:text-brand focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/20"
    type="button"
    :aria-label="ariaLabel"
    :title="ariaLabel"
    @click="$emit('toggle')"
  >
    <span aria-hidden="true">{{ icon }}</span>
  </button>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { SortDirection } from '@/types/timetable';

  const props = defineProps<{
    direction: SortDirection;
    label: string;
  }>();

  defineEmits(['toggle']);


  const icon = computed(() => (props.direction === 'asc' ? 'A-Z' : 'Z-A'));
  const ariaLabel = computed(
    () =>
      `Sort ${props.label} ${
        props.direction === 'asc' ? 'descending' : 'ascending'
      }`
  );
</script>
