<template>
  <nav
    class="mb-4 flex min-h-16 items-stretch overflow-x-auto rounded bg-app-surface px-3 sm:px-6"
    aria-label="Primary navigation"
  >
    <RouterLink
      v-for="item in navItems"
      :key="item.to"
      v-slot="{ href, navigate, isExactActive }"
      :to="item.to"
      custom
    >
      <a
        :href="href"
        :class="[
          'focus-ring inline-flex min-w-20 items-center justify-center whitespace-nowrap border-b-2 px-4 text-center text-sm font-medium leading-6 no-underline transition-colors sm:min-w-[88px] sm:px-6',
          isExactActive
            ? 'border-brand text-ink'
            : 'border-transparent text-ink-subtle hover:text-ink-soft'
        ]"
        :aria-current="isExactActive ? 'page' : undefined"
        @click="navigate"
      >
        {{ item.label }}
      </a>
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router';

  const navItems = [
    { to: '/', label: 'Bus Lines' },
    { to: '/stops', label: 'Stops' }
  ];
</script>
