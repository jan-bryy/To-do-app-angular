import { Injectable, signal } from '@angular/core';

export interface Task {
  readonly id: number;
  title: string;
  description: string;
}

export type TaskDraft = Pick<Task, 'title' | 'description'>;

const STORAGE_KEY = 'tasks';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly _tasks = signal<Task[]>(this.load());
  readonly tasks = this._tasks.asReadonly();

  add(draft: TaskDraft): void {
    this.setTasks([...this._tasks(), { id: Date.now(), ...draft }]);
  }

  update(id: number, changes: TaskDraft): void {
    this.setTasks(this._tasks().map((task) => (task.id === id ? { ...task, ...changes } : task)));
  }

  delete(id: number): void {
    this.setTasks(this._tasks().filter((task) => task.id !== id));
  }

  private setTasks(tasks: Task[]): void {
    this._tasks.set(tasks);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  private load(): Task[] {
    try {
      const saved: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      return Array.isArray(saved) ? saved.map((task) => ({ description: '', ...task })) : [];
    } catch {
      return [];
    }
  }
}
