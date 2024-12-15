// todo-list.component.ts
import { Component } from "@angular/core";
import { TodoStore } from "./store/todo2.state";
import { Observable } from "rxjs";
import { Todo } from "./models/todo.interface";

// Parent Component (Unidirectional Flow)
@Component({
  selector: 'todo-list',
  template: `
    <div>
      <todo-item
        *ngFor="let todo of todos$ | async"
        [todo]="todo"
        (toggleComplete)="toggleTodo($event)">
      </todo-item>
    </div>
  `
})
class TodoListComponent {
  todos$: Observable<Todo[]>;

  constructor(private todoStore: TodoStore) {
    this.todos$ = this.todoStore.todos$;
  }

  toggleTodo(todoId: number) {
    // Updates happen in store (SSOT)
    this.todoStore.toggleTodo(todoId);
  }
}
