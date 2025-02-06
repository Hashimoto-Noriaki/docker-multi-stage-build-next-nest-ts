import { Injectable } from '@nestjs/common';

export interface Todo {
  id: number;
  title: string;
}

@Injectable()
export class TodosService {
  private todos: Todo[] = [];
  private idCounter = 1;

  getAll() {
    return this.todos;
  }

  create(title: string) {
    const todo: Todo = { id: this.idCounter++, title };
    this.todos.push(todo);
    return todo;
  }

  remove(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return { deleted: true };
  }
}
