<script setup lang="ts">
import { create as createTodoList } from './controller';
import BaseButton from './components/BaseButton.vue';
import TodoItem from './components/TodoItem.vue';

// TODO: use localStorage
const todoList = createTodoList([
  { task: 'Task0', complete: true },
  { task: 'Task1', complete: false },
  { task: 'Task2', complete: false },
]);
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
  <div class="flex flex-col mt-12 mx-auto p-4 w-full max-w-2xl border">
    <h1 class="py-8 text-center text-4xl font-bold">
      MY TODO LIST
    </h1>
    <form
      class="flex flex-row"
      @submit.prevent="addTask"
    >
      <input
        v-model.trim="inputTask"
        type="text"
        class="px-2 w-full border"
        placeholder="Add task here..."
        required
      >
      <BaseButton
        class="button ml-2 bg-sky-600 text-white"
        text="ADD"
      />
    </form>
    <div class="mt-4">
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
</template>
