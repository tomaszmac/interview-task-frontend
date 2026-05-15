<template>
  <table class="w-full table-fixed border-collapse" :aria-label="ariaLabel">
    <thead>
      <tr
        :class="[
          'h-14 border-b',
          strongHeaderBorder ? 'border-main-universal-darker-bg' : 'border-main-light-bg'
        ]"
      >
        <th
          scope="col"
          :aria-sort="ariaSort"
          :class="[
            'text-left',
            padded ? 'px-4 sm:px-6' : 'px-0'
          ]"
        >
          <span class="inline-flex items-center gap-1.5">
            <span class="text-xs font-semibold leading-4 text-ink">
              {{ heading }}
            </span>
            <SortButton
              v-if="sortDirection && sortLabel"
              :direction="sortDirection"
              :label="sortLabel"
              @toggle="$emit('toggle-sort')"
            />
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import SortButton from '@/components/ui/SortButton.vue';
  import type { SortDirection } from '@/types/timetable';

  const props = withDefaults(
    defineProps<{
      ariaLabel: string;
      heading: string;
      sortDirection?: SortDirection;
      sortLabel?: string;
      padded?: boolean;
      strongHeaderBorder?: boolean;
    }>(),
    {
      sortDirection: undefined,
      sortLabel: undefined,
      padded: true,
      strongHeaderBorder: false
    }
  );

  defineEmits<{
    'toggle-sort': [];
  }>();

  const ariaSort = computed(() => {
    if (!props.sortDirection) {
      return undefined;
    }

    return props.sortDirection === 'asc' ? 'ascending' : 'descending';
  });
</script>
