// todo.service.ts
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Todo } from "../models/todo.interface";

// Create the TodoService
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Todo[] = [
    { id: 1, title: 'Learn Angular', completed: false },
    { id: 2, title: 'Build Todo App', completed: false }
  ];

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }
}
