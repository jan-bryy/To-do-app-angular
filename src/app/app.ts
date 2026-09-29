import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskItem } from './task-item/task-item';
import { Task, TaskDraft, TaskService } from './task-service';

const TOAST_DURATION_MS = 3000;

@Component({
  selector: 'app-root',
  imports: [FormsModule, TaskItem],
  templateUrl: './app.html',
  host: { '(document:keydown.escape)': 'cancelDelete()' },
})
export class App {
  private readonly taskService = inject(TaskService);
  private toastTimer?: ReturnType<typeof setTimeout>;

  protected readonly tasks = this.taskService.tasks;
  protected readonly formOpen = signal(false);
  protected readonly pendingDelete = signal<Task | null>(null);
  protected readonly toastMessage = signal<string | null>(null);
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

  protected requestDelete(task: Task): void {
    this.pendingDelete.set(task);
  }

  protected cancelDelete(): void {
    this.pendingDelete.set(null);
  }

  protected confirmDelete(): void {
    const task = this.pendingDelete();
    if (!task) return;

    this.taskService.delete(task.id);
    this.pendingDelete.set(null);
    this.showToast(`Deleted "${task.title}"`);
  }

  protected dismissToast(): void {
    clearTimeout(this.toastTimer);
    this.toastMessage.set(null);
  }

  private showToast(message: string): void {
    clearTimeout(this.toastTimer);
    this.toastMessage.set(message);
    this.toastTimer = setTimeout(() => this.toastMessage.set(null), TOAST_DURATION_MS);
  }
}
