<template>
  <form class="flex flex-col gap-2 pt-4" role="search" @submit.prevent>
    <label
      class="text-sm font-semibold leading-6 text-ink"
      for="stops-search-input"
    >
      Search
    </label>
    <input
      id="stops-search-input"
      class="h-12 w-full max-w-[360px] rounded border border-line bg-app-surface px-4 py-3 text-sm leading-6 text-ink placeholder:text-ink-subtle focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-brand/20"
      type="search"
      v-model="model"
      placeholder="Search bus stops"
      autocomplete="off"
    >
  </form>
</template>

<script setup lang="ts">
  const model = defineModel<string>({ required: true });
</script>
