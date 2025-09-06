import { StorageService } from "./StorageService.ts";

const ACTIVE_PROJECT_KEY = "activeProjectId";

export class ActiveProjectService 
{
    static setActiveProject(projectId: string): void 
    {
        StorageService.set(ACTIVE_PROJECT_KEY, projectId);
    }

    static getActiveProjectId(): string | null 
    {
        return StorageService.get<string>(ACTIVE_PROJECT_KEY);
    }

    static clearActiveProject(): void 
    {
        StorageService.remove(ACTIVE_PROJECT_KEY);
    }
}
