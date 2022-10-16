<script setup lang="ts">
import type { ComputedRef } from 'vue';
import { useSlots, computed } from 'vue';

const props = defineProps<{
  text?: string;
  disabled?: boolean;
}>();
const slots = useSlots();
const style: ComputedRef<string> = computed(() => (props.disabled
  ? 'tw text-white bg-gray-200'
  : ''
));
const isAvailableIcon = computed(() => !!slots.icon);
</script>

<template>
  <button
    class="px-2 font-mono border rounded flex flex-row items-center"
    :class="style"
    :disabled="disabled || false"
  >
    <div
      v-if="isAvailableIcon"
      class="w-4 h-4 mr-1"
    >
      <slot name="icon" />
    </div>
    <div
      v-if="text"
      v-text="text"
    />
    <div v-else>
      <slot />
    </div>
  </button>
</template>
