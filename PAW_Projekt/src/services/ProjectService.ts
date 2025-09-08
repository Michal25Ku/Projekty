import type { Project } from "../models/Project.ts";
import { StorageService } from "./StorageService.ts";
import { StoryService } from "./StoryService.ts";

const STORAGE_KEY = "projects";

export class ProjectService 
{
    static getAll(): Project[] 
    {
      return StorageService.get<Project[]>(STORAGE_KEY) ?? [];
    }

    static getById(id: string): Project | undefined 
    {
      return this.getAll().find(p => p._id === id);
    }

    static create(project: Project): void 
    {
      const projects = this.getAll();
      projects.push(project);
      StorageService.set(STORAGE_KEY, projects);
    }

    static update(updatedProject: Project): void 
    {
      const projects = this.getAll().map(p =>
        p._id === updatedProject._id ? updatedProject : p
      );
      StorageService.set(STORAGE_KEY, projects);
    }

    static delete(id: string): void 
    {
      const relatedStories = StoryService.getByProject(id);
      relatedStories.forEach(story => StoryService.delete(story._id!));

      const projects = this.getAll().filter(p => p._id !== id);
      StorageService.set(STORAGE_KEY, projects);
    }
}