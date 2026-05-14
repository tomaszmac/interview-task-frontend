<template>
  <div class="mx-auto min-h-screen w-full max-w-[1440px] px-4 py-6 sm:px-8 sm:py-10">
    <header class="mb-6">
      <h1 class="text-2xl font-semibold leading-8 text-ink">Timetable</h1>
    </header>

    <AppNav />

    <main id="main-content" class="min-w-0 focus:outline-none" tabindex="-1">
      <RouterView />
    </main>

    <ToastHost />
  </div>
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import AppNav from '@/components/layout/AppNav.vue';
  import ToastHost from '@/components/ui/ToastHost.vue';
</script>
