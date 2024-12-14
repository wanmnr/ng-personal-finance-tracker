// todo.state.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Todo } from '../models/todo.interface';
import { TodoService } from '../services/todo.service';

@Injectable({
  providedIn: 'root'
})
export class TodoStore {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  todos$: Observable<Todo[]> = this.todosSubject.asObservable();

  constructor(private todoService: TodoService) {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.todoService.getTodos().subscribe(todos => {
      this.todosSubject.next(todos);
    });
  }

  toggleTodo(todoId: number): void {
    const currentTodos = this.todosSubject.value;
    const updatedTodos = currentTodos.map(todo =>
      todo.id === todoId
        ? { ...todo, completed: !todo.completed }
        : todo
    );
    this.todosSubject.next(updatedTodos);
  }

  // Optional: Add more state management methods as needed
  addTodo(title: string): void {
    const currentTodos = this.todosSubject.value;
    const newTodo: Todo = {
      id: Math.max(...currentTodos.map(t => t.id), 0) + 1,
      title,
      completed: false
    };
    this.todosSubject.next([...currentTodos, newTodo]);
  }

  removeTodo(todoId: number): void {
    const currentTodos = this.todosSubject.value;
    const updatedTodos = currentTodos.filter(todo => todo.id !== todoId);
    this.todosSubject.next(updatedTodos);
  }
}
