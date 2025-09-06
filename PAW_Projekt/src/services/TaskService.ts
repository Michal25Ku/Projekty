import { StorageService } from "./StorageService.ts";
import type { Task } from "../models/Task.ts";

const STORAGE_KEY = "tasks";

export class TaskService 
{
    static getAll(): Task[] 
    {
        return StorageService.get<Task[]>(STORAGE_KEY) ?? [];
    }

    static getById(id: string): Task | undefined 
    {
        return this.getAll().find(t => t.id === id);
    }

    static getByStory(storyId: string): Task[] 
    {
        return this.getAll().filter(t => t.storyId === storyId);
    }

    static create(task: Task): void 
    {
        const tasks = this.getAll();
        tasks.push(task);
        StorageService.set(STORAGE_KEY, tasks);
    }

    static update(updatedTask: Task): void 
    {
        const tasks = this.getAll().map(t =>
            t.id === updatedTask.id ? updatedTask : t
        );
        StorageService.set(STORAGE_KEY, tasks);
    }

    static delete(id: string): void 
    {
        const tasks = this.getAll().filter(t => t.id !== id);
        StorageService.set(STORAGE_KEY, tasks);
    }
}
