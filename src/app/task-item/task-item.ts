import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../task-service';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule],
  templateUrl: './task-item.html',
})
export class TaskItem {
  @Input({ required: true }) task!: Task;
  @Output() save = new EventEmitter<{ title: string; description: string }>();
  @Output() remove = new EventEmitter<void>();

  editing = false;
  draftTitle = '';
  draftDescription = '';

  startEdit() {
    this.draftTitle = this.task.title;
    this.draftDescription = this.task.description ?? '';
    this.editing = true;
  }

  confirm() {
    if (this.draftTitle.trim()) {
      this.save.emit({
        title: this.draftTitle.trim(),
        description: this.draftDescription.trim(),
      });
    }
    this.editing = false;
  }
}