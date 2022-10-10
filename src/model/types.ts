export type SerialNumber = number;

export interface RawTodo {
  task: string;
  complete: boolean;
}

export interface Todo extends RawTodo {
  sn: number;
}

export type Todos = Todo[];
