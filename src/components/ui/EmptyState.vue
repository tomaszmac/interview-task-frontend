<template>
  <div
    class="flex min-h-[320px] items-center justify-center rounded border-2 border-dashed border-ink-subtle bg-app-surface p-6 text-center text-sm leading-6 text-ink-muted sm:min-h-[444px]"
    role="status"
    aria-live="polite"
  >
    <p class="m-0">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    message: string;
  }>();
</script>
