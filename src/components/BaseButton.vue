<script setup lang="ts">
import type { ComputedRef } from 'vue';
import { computed } from 'vue';

const props = defineProps<{
  text?: string;
  disabled?: boolean;
}>();
const style: ComputedRef<string> = computed(() => (props.disabled
  ? 'tw text-white bg-gray-200'
  : ''
));
</script>

<template>
  <button
    class="px-4 py-1 text-xs font-mono border rounded"
    :class="style"
    :disabled="disabled || false"
  >
    <div
      v-if="text"
      v-text="text"
    />
    <div v-else>
      <slot />
    </div>
  </button>
</template>
