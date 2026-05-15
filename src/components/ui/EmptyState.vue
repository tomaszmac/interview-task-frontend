<template>
  <div
    class="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-[4px] bg-app-surface p-6 text-center text-sm leading-6 text-ink-muted sm:min-h-[444px]"
    role="status"
    aria-live="polite"
  >
    <span
      class="empty-state-border__side empty-state-border__side--top"
      aria-hidden="true"
    ></span>
    <span
      class="empty-state-border__side empty-state-border__side--right"
      aria-hidden="true"
    ></span>
    <span
      class="empty-state-border__side empty-state-border__side--bottom"
      aria-hidden="true"
    ></span>
    <span
      class="empty-state-border__side empty-state-border__side--left"
      aria-hidden="true"
    ></span>
    <span
      class="empty-state-border__corner empty-state-border__corner--top-left"
      aria-hidden="true"
    ></span>
    <span
      class="empty-state-border__corner empty-state-border__corner--top-right"
      aria-hidden="true"
    ></span>
    <span
      class="empty-state-border__corner empty-state-border__corner--bottom-right"
      aria-hidden="true"
    ></span>
    <span
      class="empty-state-border__corner empty-state-border__corner--bottom-left"
      aria-hidden="true"
    ></span>

    <p class="relative z-[1] m-0">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    message: string;
  }>();
</script>

<style scoped>
  .empty-state-border__side,
  .empty-state-border__corner {
    --empty-border-color: #9A9DA4;
    --empty-border-width: 2px;
    --empty-corner-size: 28px;
    --empty-side-inset: 44px;
    --empty-dash-size: 48px;
    --empty-gap-size: 32px;

    position: absolute;
    pointer-events: none;
  }

  .empty-state-border__side--top,
  .empty-state-border__side--bottom {
    left: var(--empty-side-inset);
    right: var(--empty-side-inset);
    height: var(--empty-border-width);
    background-image: repeating-linear-gradient(
      to right,
      var(--empty-border-color) 0 var(--empty-dash-size),
      transparent var(--empty-dash-size) calc(var(--empty-dash-size) + var(--empty-gap-size))
    );
  }

  .empty-state-border__side--left,
  .empty-state-border__side--right {
    top: var(--empty-side-inset);
    bottom: var(--empty-side-inset);
    width: var(--empty-border-width);
    background-image: repeating-linear-gradient(
      to bottom,
      var(--empty-border-color) 0 var(--empty-dash-size),
      transparent var(--empty-dash-size) calc(var(--empty-dash-size) + var(--empty-gap-size))
    );
  }

  .empty-state-border__side--top {
    top: 0;
  }

  .empty-state-border__side--right {
    right: 0;
  }

  .empty-state-border__side--bottom {
    bottom: 0;
  }

  .empty-state-border__side--left {
    left: 0;
  }

  .empty-state-border__corner {
    width: var(--empty-corner-size);
    height: var(--empty-corner-size);
    border-color: var(--empty-border-color);
    border-style: solid;
  }

  .empty-state-border__corner--top-left {
    top: 0;
    left: 0;
    border-width: 2px 0 0 2px;
    border-top-left-radius: 4px;
  }

  .empty-state-border__corner--top-right {
    top: 0;
    right: 0;
    border-width: 2px 2px 0 0;
    border-top-right-radius: 4px;
  }

  .empty-state-border__corner--bottom-right {
    right: 0;
    bottom: 0;
    border-width: 0 2px 2px 0;
    border-bottom-right-radius: 4px;
  }

  .empty-state-border__corner--bottom-left {
    bottom: 0;
    left: 0;
    border-width: 0 0 2px 2px;
    border-bottom-left-radius: 4px;
  }
</style>
