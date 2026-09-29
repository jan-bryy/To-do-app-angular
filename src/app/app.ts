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

  constructor(private taskService: TaskService) {}

  get tasks(): Task[] {
    return this.taskService.getTasks();
  }

  add() {
    if (!this.newTitle.trim()) return;
    this.taskService.add(this.newTitle.trim());
    this.newTitle = '';
  }

  update(id: number, title: string) {
    this.taskService.update(id, title);
  }

  delete(id: number) {
    this.taskService.delete(id);
  }
}