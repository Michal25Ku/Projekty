export type TaskStatus = "todo" | "doing" | "done";
export type TaskPriority = "niski" | "średni" | "wysoki";

export interface Task 
{
    id: string;
    name: string;
    description: string;
    priority: TaskPriority;
    storyId: string;
    estimatedExecutionTime: number;
    status: TaskStatus;
    addDate: string;
    startDate?: string;
    endDate?: string;
    userId?: string;
}
