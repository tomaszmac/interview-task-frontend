<template>
  <div
    class="flex min-h-24 items-center gap-2.5 px-4 py-6 text-sm leading-6 text-ink-muted sm:px-6"
    role="status"
    aria-live="polite"
  >
    <span
      class="h-[18px] w-[18px] animate-spin rounded-full border-2 border-line border-t-brand"
      aria-hidden="true"
    ></span>
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      label?: string;
    }>(),
    {
      label: 'Loading timetable data'
    }
  );
</script>
