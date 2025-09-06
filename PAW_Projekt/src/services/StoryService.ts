import { StorageService } from "./StorageService.ts";
import type { Story } from "../models/Story.ts";
import { TaskService } from "./TaskService.ts";

const STORAGE_KEY = "stories";

export class StoryService 
{
    static getAll(): Story[] 
    {
        return StorageService.get<Story[]>(STORAGE_KEY) ?? [];
    }

    static getById(id: string): Story | undefined 
    {
      return this.getAll().find(s => s.id === id);
    }

    static getByProject(projectId: string): Story[] 
    {
        return this.getAll().filter(s => s.projectId === projectId);
    }

    static create(story: Story): void 
    {
        const stories = this.getAll();
        stories.push(story);
        StorageService.set(STORAGE_KEY, stories);
    }

    static update(updatedStory: Story): void 
    {
        const stories = this.getAll().map(s =>
        s.id === updatedStory.id ? updatedStory : s
        );
        StorageService.set(STORAGE_KEY, stories);
    }

    static delete(id: string): void 
    {
        const relatedTasks = TaskService.getByStory(id);
        relatedTasks.forEach(task => TaskService.delete(task.id));

        const stories = this.getAll().filter(s => s.id !== id);
        StorageService.set(STORAGE_KEY, stories);
    }
}
