export type TaskState = "todo" | "doing" | "done";
export type TaskPriority = "niski" | "średni" | "wysoki";

export interface Task 
{
    _id?: string;
    name: string;
    description: string;
    priority: TaskPriority;
    story: string;
    estimatedTime: number;
    state: TaskState;
    createdAt: string;
    startDate?: string;
    endDate?: string;
    assignedUser?: string;
}
