import type {
  RawTodo, SerialNumber, Todo, Todos,
} from './types';

export class TodoList {
  static create (todos: RawTodo[] = []) {
    const todoList = new TodoList();

    todos.forEach((todo) => {
      const sn = todoList.add(todo.task);

      todoList.toggle(sn, todo.complete);
    });

    return todoList;
  }

  #serialNumber: number = 0;

  #todosMap: Map<SerialNumber, Todo> = new Map();

  #todos: Todos = [];

  get todos () {
    return this.#todos.slice();
  }

  get (serialNumber: SerialNumber) {
    return this.#todosMap.get(serialNumber);
  }

  /**
   * Returns a serial number that can be used to modify/delete todo
   */
  add (task: string): SerialNumber {
    if (!task) {
      return -1;
    }

    const serialNumber = this.#serialNumber;
    const todo: Todo = {
      sn: serialNumber,
      task,
      complete: false,
    };

    this.#serialNumber += 1;
    this.#todosMap.set(serialNumber, todo);
    this.#todos.push(todo);

    return serialNumber;
  }

  toggle (serialNumber: SerialNumber, force?: boolean) {
    const todo = this.#todosMap.get(serialNumber);

    if (!todo) {
      throw new Error(`No such todo, serial number: ${serialNumber}`);
    }

    todo.complete = (typeof force === 'boolean'
      ? force
      : !todo.complete
    );

    return todo.complete;
  }

  edit (serialNumber: SerialNumber, task: string) {
    if (!task) {
      return -1;
    }

    const todo = this.#todosMap.get(serialNumber);

    if (!todo) {
      throw new Error(`No such todo, serial number: ${serialNumber}`);
    }

    todo.task = task;

    return task;
  }

  delete (serialNumber: SerialNumber) {
    const success = this.#todosMap.delete(serialNumber);

    if (success) {
      this.#todos = this.#todos.filter((todo) => todo.sn !== serialNumber);
    }

    return success;
  }

  swap (serialNumber0: SerialNumber, serialNumber1: SerialNumber) {
    const todos = this.#todos;
    const todo0 = this.get(serialNumber0);
    const todo1 = this.get(serialNumber1);

    if (!todo0 || !todo1) {
      throw new Error(`No such todos, serial number: ${serialNumber0} or ${serialNumber1}`);
    }

    const todoIndex0 = todos.indexOf(todo0);
    const todoIndex1 = todos.indexOf(todo1);

    todos[todoIndex0] = todo1;
    todos[todoIndex1] = todo0;
  }
}

export const create = TodoList.create.bind(TodoList);
