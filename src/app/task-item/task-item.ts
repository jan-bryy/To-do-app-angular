import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskDraft } from '../task-service';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule],
  templateUrl: './task-item.html',
})
export class TaskItem {
  readonly task = input.required<Task>();
  readonly save = output<TaskDraft>();
  readonly remove = output<void>();

  protected readonly editing = signal(false);
  protected title = '';
  protected description = '';

  protected startEdit(): void {
    this.title = this.task().title;
    this.description = this.task().description;
    this.editing.set(true);
  }

  protected confirm(): void {
    const title = this.title.trim();
    if (title) {
      this.save.emit({ title, description: this.description.trim() });
    }
    this.editing.set(false);
  }

  protected cancel(): void {
    this.editing.set(false);
  }
}
