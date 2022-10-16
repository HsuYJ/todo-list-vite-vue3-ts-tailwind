<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline';
import { use as useTodoList } from './store';
import BaseButton from './components/basic/BaseButton.vue';
import TodoItem from './components/TodoItem.vue';

const todoList = useTodoList();
const { todos, inputTask, currentEditTodo } = todoList;

function addTask () {
  const result = todoList.add(inputTask.value);

  if (result === -1) {
    alert('Please enter your task');
    return;
  }

  inputTask.value = '';
}
</script>

<template>
  <div class="mx-auto w-full max-w-2xl h-full">
    <h1
      class="
        z-10
        sticky top-0
        py-4
        text-2xl text-center font-bold
        bg-white
        shadow-lg
      "
    >
      MY TODO LIST
    </h1>
    <div class="w-full h-full border flex flex-col">
      <div class="p-4 border-b">
        <form
          class="
            h-8
            flex flex-row
          "
          @submit.prevent="addTask"
        >
          <input
            ref="inputRef"
            v-model.trim="inputTask"
            type="text"
            class="px-2 w-full border rounded-lg rounded-r-none border-r-0 outline-none"
            placeholder="Add task here..."
          >
          <BaseButton
            class="rounded-l-none"
            text="New"
          >
            <template #icon>
              <PlusIcon />
            </template>
          </BaseButton>
        </form>
      </div>
      <div class="pb-8">
        <TodoItem
          v-for="todo in todos"
          :key="todo.sn"
          :task="(todo.sn === currentEditTodo.sn
            ? currentEditTodo.task
            : todo.task
          )"
          :isComplete="todo.complete"
          :isEdit="todo.sn === currentEditTodo?.sn"
          @edit="todoList.edit(todo.sn)"
          @submit="(task) => todoList.endEdit(task)"
          @toggle="todoList.toggle(todo.sn)"
          @delete="todoList.delete(todo.sn)"
        />
      </div>
    </div>
  </div>
</template>
