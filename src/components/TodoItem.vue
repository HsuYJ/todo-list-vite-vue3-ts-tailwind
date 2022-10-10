<script setup lang="ts">
import type { Ref } from 'vue';
import { nextTick, watch, ref } from 'vue';
import BaseButton from './BaseButton.vue';

const props = defineProps<{
  task: string;
  isComplete: boolean;
  isEdit: boolean;
}>();
const emit = defineEmits<{
  (e: 'edit'): void;
  (e: 'submit', task: string): void;
  (e: 'toggle'): void;
  (e: 'delete'): void;
}>();
const inputEdit: Ref<HTMLInputElement|null> = ref(null);
const currentTask = ref(props.task);

watch(() => props.isEdit, async (value) => {
  if (!value) {
    return;
  }

  await nextTick();
  inputEdit.value?.select();
});

const taskStyle = `tw
  py-2 border-b-[1px]
  flex flex-row justify-between items-center
  [&>:first-child]:w-64
  [&>:first-child]:flex-shrink-0
`;
</script>

<template>
  <div :class="taskStyle">
    <div
      v-if="!isEdit"
      title="Double click to edit"
      class="task break-all hover:animate-pulse border border-transparent"
      style="animation-duration: .5s"
      @dblclick="emit('edit')"
      v-text="task"
    />
    <form
      v-else
      class="flex flex-row"
      @submit.prevent="emit('submit', currentTask)"
    >
      <input
        ref="inputEdit"
        v-model="currentTask"
        type="text"
        class="border rounded rounded-r-none border-r-0 outline-none"
      >
      <BaseButton
        class="rounded-l-none"
        text="SUBMIT"
      />
    </form>
    <div
      class="px-2 py-0.5 text-sm font-mono text-white border rounded-xl cursor-pointer"
      :class="(isComplete
        ? 'bg-green-500'
        : 'bg-orange-500'
      )"
      @click="emit('toggle')"
    >
      {{ isComplete ? 'Done' : 'Not yet' }}
    </div>
    <BaseButton
      class="w-[initial!important] text-white bg-red-600"
      text="DELETE"
      :disabled="isEdit"
      @click.stop="emit('delete')"
    />
  </div>
</template>
