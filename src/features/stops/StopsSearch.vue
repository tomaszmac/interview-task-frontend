<template>
  <form class="w-full" role="search" @submit.prevent>
    <div class="relative h-10 w-full max-w-[288px]">
      <label
        :class="[
          'pointer-events-none absolute left-3 top-[-9px] z-10 bg-app-surface px-1 text-[10px] font-normal leading-4 text-ink-muted transition-opacity',
          isActive ? 'opacity-100' : 'opacity-0'
        ]"
        for="stops-search-input"
      >
        Search
      </label>

      <input
        id="stops-search-input"
        v-model="model"
        :class="[
          'focus-ring h-10 w-full rounded border bg-app-surface px-4 py-3 text-xs font-normal leading-4 text-ink-soft placeholder:text-ink-muted',
          isActive ? 'border-brand pr-4' : 'border-line pr-10'
        ]"
        type="search"
        :placeholder="isActive ? '' : 'Search...'"
        autocomplete="off"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >

      <img
        v-if="!isActive"
        class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2"
        src="@/assets/icon-search.svg"
        alt=""
        aria-hidden="true"
      >
    </div>
  </form>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';

  const model = defineModel<string>({ required: true });
  const isFocused = ref(false);
  const isActive = computed(() => isFocused.value || model.value.length > 0);
</script>
