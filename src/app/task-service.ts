import { Injectable } from '@angular/core';

export interface Task {
  id: number;
  title: string;
}

@Injectable({ providedIn: 'root' })
export class TaskService {
  private key = 'tasks';
  private tasks: Task[] = JSON.parse(localStorage.getItem(this.key) ?? '[]');

  getTasks(): Task[] {
    return this.tasks;
  }

  add(title: string) {
    this.tasks.push({ id: Date.now(), title });
    this.save();
  }

  update(id: number, title: string) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.title = title;
      this.save();
    }
  }

  delete(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id);
    this.save();
  }

  private save() {
    localStorage.setItem(this.key, JSON.stringify(this.tasks));
  }
}