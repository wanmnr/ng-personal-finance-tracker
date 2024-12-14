// src/app/demo/todo/todo.component.ts
import { Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { Todo } from "./models/todo.interface";
import { TodoService } from "./services/todo.service";

@Component({
  template: `
    <div *ngFor="let todo of todos$ | async">
      <input [(ngModel)]="todo.title" (change)="updateTodo(todo)">
    </div>
  `
})
class TodoComponent implements OnInit {
  // Declaration with typed Observable
  private todoSubject: BehaviorSubject<Todo[]>;

  // Public Observable with $ convention
  todos$: Observable<Todo[]>;

  // Initialization in constructor
  constructor(private todoService: TodoService) {
    // Instantiation of BehaviorSubject
    this.todoSubject = new BehaviorSubject<Todo[]>([]);

    // Initialization of public Observable
    this.todos$ = this.todoSubject.asObservable();
  }

  // Additional initialization in lifecycle hook
  ngOnInit() {
    this.todoService.getTodos().subscribe(
      todos => this.todoSubject.next(todos)
    );
  }

  // Immutable update
  updateTodo(updatedTodo: Todo) {
    const current = this.todoSubject.getValue();
    const updated = current.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    );
    this.todoSubject.next(updated);
  }
}
