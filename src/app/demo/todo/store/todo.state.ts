// Demo: todo.state.ts
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Todo } from "../models/todo.interface";

// Store (Single Source of Truth)
@Injectable({
  providedIn: 'root'
})
export class TodoStore {
  private todos = new BehaviorSubject<Todo[]>([]);
  todos$ = this.todos.asObservable();

  addTodo(todo: Todo) {
    const current = this.todos.getValue();
    this.todos.next([...current, todo]);
  }
}



// Data Flow:

// Initial Setup:
// TodoStore is instantiated as singleton
// BehaviorSubject initializes with empty array
// Components can subscribe to todos$ Observable
// Data Flow Down:

// Copy
// TodoStore (todos$)
//   → TodoListComponent (async pipe)
//     → TodoItemComponent ([todo] input)
// Event Flow Up:

// Copy
// TodoItemComponent (checkbox change)
//   → onToggle()
//   → toggleComplete.emit()
//   → TodoListComponent (toggleTodo)
//   → TodoStore (toggleTodo)
// State Update Cycle:
// User clicks checkbox
// Event bubbles up to store
// Store updates state
// New state flows down to all subscribers
// UI updates automatically
