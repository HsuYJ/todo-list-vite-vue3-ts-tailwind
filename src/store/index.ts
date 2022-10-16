import type { Ref } from 'vue';
import { watch, ref } from 'vue';
import type { RawTodo, SerialNumber, Todos } from '../model/types';
import type { TodoList as Model } from '../model';
import { create as createModel } from '../model';

export class TodoList {
  constructor (todos: RawTodo[] = []) {
    this.#model = createModel(todos);
    this.#render();
  }

  #model: Model;

  #isRenderRegister: boolean = false;

  todos: Ref<Todos> = ref([]);

  inputTask: Ref<string> = ref('');

  currentEditTodo: Ref<{
    sn: SerialNumber;
    task: string;
  }> = ref({ sn: -1, task: '' });

  #render () {
    this.todos.value = this.#model.todos.slice();
  }

  #registerRender () {
    if (this.#isRenderRegister) {
      return;
    }

    this.#isRenderRegister = true;
    setTimeout(() => {
      this.#isRenderRegister = false;
      this.#render();
    }, 0);
  }

  get (serialNumber: SerialNumber) {
    return this.#model.get(serialNumber);
  }

  add (task: string) {
    const result = this.#model.add(task);

    this.#registerRender();

    return result;
  }

  toggle (serialNumber: SerialNumber, force?: boolean) {
    const result = this.#model.toggle(serialNumber, force);

    this.#registerRender();

    return result;
  }

  edit (serialNumber: SerialNumber) {
    const todo = this.#model.get(serialNumber);

    if (!todo) {
      throw new Error(`No such todo, serial number: ${serialNumber}`);
    }

    this.currentEditTodo.value = {
      sn: todo.sn,
      task: todo.task,
    };
  }

  endEdit (task?: string) {
    const { currentEditTodo } = this;
    const { sn, task: oldTask } = currentEditTodo.value;
    const result = this.#model.edit(sn, task || oldTask);

    this.currentEditTodo.value = {
      sn: -1,
      task: '',
    };
    this.#registerRender();

    return result;
  }

  delete (serialNumber: SerialNumber) {
    const result = this.#model.delete(serialNumber);

    this.#registerRender();

    return result;
  }

  swap (serialNumber0: SerialNumber, serialNumber1: SerialNumber) {
    this.#model.swap(serialNumber0, serialNumber1);
    this.#registerRender();
  }
}

const ls = localStorage;
const lsKey = 'tasks';
const tasks: Todos = JSON.parse(ls.getItem(lsKey) || '[]');
const todoList: TodoList = new TodoList(tasks);

watch(todoList.todos, (value) => {
  ls.setItem(lsKey, JSON.stringify(value));
});

export function use () {
  return todoList;
}
