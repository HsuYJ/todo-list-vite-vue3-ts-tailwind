<script setup lang="ts">
import type { Ref } from 'vue';
import {
  computed, nextTick, watch, ref,
} from 'vue';
import {
  EllipsisHorizontalIcon, ArrowUpIcon, PencilIcon, XMarkIcon,
} from '@heroicons/vue/24/outline';
import CheckBox from './basic/CheckBox.vue';
import BaseButton from './basic/BaseButton.vue';

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
const inputRef: Ref<HTMLInputElement|null> = ref(null);
const currentTask = ref(props.task);
const isVisibleOperation = ref(false);
const lineThroughDurationPerText = computed(() => {
  const taskLength = props.task.length;
  const totalDuration = Math.min(500, Math.max(100, taskLength * 2));
  const perTextDuration = totalDuration / taskLength;

  return perTextDuration;
});

watch(isVisibleOperation, async (value) => {
  if (!value) {
    return;
  }

  await new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
  document.addEventListener('click', () => {
    isVisibleOperation.value = false;
  }, { once: true });
});
watch(() => props.isEdit, async (value) => {
  if (!value) {
    return;
  }

  await nextTick();
  inputRef.value?.select();
});
</script>

<template>
  <!-- task -->
  <div
    class="
      overflow-hidden
      relative
      px-4 py-2
      border-b
      font-mono
      flex flex-row justify-between items-start
    "
  >
    <!-- status -->
    <CheckBox
      class="flex-shrink-0"
      :isCheck="isComplete"
      @toggle="emit('toggle')"
    />
    <!-- task: default -->
    <div
      v-if="!isEdit"
      class="
        self-center
        w-full
        mx-2
        relative
        flex flex-row
      "
    >
      <div
        title="Double click to edit"
        class="break-all"
        @dblclick="emit('edit')"
      >
        <div v-text="task" />
        <div
          class="
            absolute left-0 top-0
            w-full h-full
            text-black
            pointer-events-none
            flex flex-row flex-wrap
          "
        >
          <div
            v-for="(text, index) in task"
            :key="index"
            class="relative"
          >
            <div
              class="text-transparent whitespace-pre"
              v-text="text"
            />
            <div
              class="
                absolute left-0 top-1/2
                w-full h-1
                bg-green-600 bg-opacity-60
                origin-left ease-linear
              "
              :class="[
                (isComplete
                  ? 'scale-x-100'
                  : 'scale-x-0'
                ),
                (Math.random() < 0.5
                  ? '-translate-y-[1px]'
                  : 'translate-y-0'
                ),
              ]"
              :style="{
                transitionDuration: `${lineThroughDurationPerText}ms`,
                transitionDelay: (isComplete
                  ? `${lineThroughDurationPerText * index}ms`
                  : `${lineThroughDurationPerText * (task.length - index)}ms`
                )
              }"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- task: editing -->
    <form
      v-else
      class="w-full h-8 flex flex-row"
      @submit.prevent="emit('submit', currentTask)"
    >
      <input
        ref="inputRef"
        v-model="currentTask"
        type="text"
        class="w-full border rounded-lg rounded-r-none border-r-0 outline-none"
      >
      <BaseButton
        class="rounded-l-none"
        text="Submit"
      >
        <template #icon>
          <ArrowUpIcon />
        </template>
      </BaseButton>
    </form>
    <EllipsisHorizontalIcon
      class="
        flex-shrink-0
        p-1
        w-8 h-8
        cursor-pointer
      "
      @click="isVisibleOperation = !isVisibleOperation"
    />
    <!-- operations -->
    <div
      class="
        absolute right-0 top-0
        p-2
        h-full
        bg-gray-200
        border-l
        transition-transform
        origin-right
        duration-150
        grid grid-flow-col items-center gap-2
      "
      :class="(isVisibleOperation
        ? 'translate-x-0'
        : 'translate-x-[100%]'
      )"
    >
      <BaseButton
        text="Edit"
        @click="emit('edit')"
      >
        <template #icon>
          <PencilIcon />
        </template>
      </BaseButton>
      <BaseButton
        text="Delete"
        @click="emit('delete')"
      >
        <template #icon>
          <XMarkIcon />
        </template>
      </BaseButton>
    </div>
  </div>
</template>
