import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItem } from './task-item/task-item';
import { TaskDraft, TaskService } from './task-service';

@Component({
  selector: 'app-root',
  imports: [FormsModule, TaskItem],
  templateUrl: './app.html',
})
export class App {
  private readonly taskService = inject(TaskService);

  protected readonly tasks = this.taskService.tasks;
  protected readonly formOpen = signal(false);
  protected title = '';
  protected description = '';

  protected openForm(): void {
    this.formOpen.set(true);
  }

  protected closeForm(): void {
    this.title = '';
    this.description = '';
    this.formOpen.set(false);
  }

  protected add(): void {
    const title = this.title.trim();
    if (!title) return;

    this.taskService.add({ title, description: this.description.trim() });
    this.closeForm();
  }

  protected update(id: number, changes: TaskDraft): void {
    this.taskService.update(id, changes);
  }

  protected remove(id: number): void {
    this.taskService.delete(id);
  }
}
