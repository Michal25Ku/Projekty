export type StoryState = "todo" | "doing" | "done";
export type StoryPriority = "niski" | "średni" | "wysoki";

export interface Story 
{
  _id?: string;
  name: string;
  description: string;
  priority: StoryPriority;
  project: string;
  createdAt: string;
  state: StoryState;
  owner: string;
}