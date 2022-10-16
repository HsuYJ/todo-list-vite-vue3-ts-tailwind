<script setup lang="ts">
import { CheckIcon } from '@heroicons/vue/24/solid';

defineProps<{
  isCheck: boolean;
}>();
const emit = defineEmits<{
  (e: 'toggle'): void;
}>();
</script>

<template>
  <div
    class="
      mr-2 p-1
      w-8
      text-green-500
      border rounded-lg
      cursor-pointer
    "
    @click="emit('toggle')"
    @mousedown.prevent
  >
    <CheckIcon
      class="
        h-full
        transition-all duration-300
        will-change-transform
      "
      :class="(isCheck
        ? 'opacity-100 scale-100'
        : 'opacity-5 scale-0'
      )"
    />
  </div>
</template>
