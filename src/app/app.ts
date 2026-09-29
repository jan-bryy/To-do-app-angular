import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItem } from './task-item/task-item';
import { Task, TaskService } from './task-service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, TaskItem],
  templateUrl: './app.html',
})
export class App {
  newTitle = '';
  newDescription = '';

  constructor(private taskService: TaskService) {}

  get tasks(): Task[] {
    return this.taskService.getTasks();
  }

  add() {
    if (!this.newTitle.trim()) return;
    this.taskService.add(this.newTitle.trim(), this.newDescription.trim());
    this.newTitle = '';
    this.newDescription = '';
  }

  update(id: number, changes: { title: string; description: string }) {
    this.taskService.update(id, changes.title, changes.description);
  }

  delete(id: number) {
    this.taskService.delete(id);
  }
}