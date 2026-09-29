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
  @Output() save = new EventEmitter<string>();
  @Output() remove = new EventEmitter<void>();

  editing = false;
  draft = '';

  startEdit() {
    this.draft = this.task.title;
    this.editing = true;
  }

  confirm() {
    if (this.draft.trim()) this.save.emit(this.draft.trim());
    this.editing = false;
  }
}