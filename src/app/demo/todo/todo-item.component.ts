// todo-item.component.ts
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Todo } from "./models/todo.interface";

// Child Component (Unidirectional Flow)
@Component({
  selector: 'todo-item',
  template: `
    <div>
      <input type="checkbox"
        [checked]="todo.completed"
        (change)="onToggle()">
      {{todo.title}}
    </div>
  `
})
class TodoItemComponent {
  @Input() todo: Todo = {
    id: 0,
    title: '',
    completed: false
  };
  @Output() toggleComplete = new EventEmitter<number>();

  onToggle() {
    this.toggleComplete.emit(this.todo.id);
  }
}
