import axios from 'axios';
import type { Task } from '../models/Task';

const API_URL = 'http://localhost:5000/api/tasks';

export class TaskApi
{
    static async getAll(): Promise<Task[]>
    {
        return (await axios.get<Task[]>(API_URL)).data;
    }

    static async getByStory(storyId: string): Promise<Task[]> 
    {
        return (await axios.get<Task[]>(`${API_URL}/story/${storyId}`)).data;
    }

    static async getById(id: string): Promise<Task>
    {
        return (await axios.get<Task>(`${API_URL}/${id}`)).data;
    }

    static async create(task: Task): Promise<void>
    {
        (await axios.post<Task>(API_URL, task)).data;
    }

    static async update(id: string, task: Task): Promise<void>
    {
        (await axios.put<Task>(`${API_URL}/${id}`, task)).data;
    }

    static async delete(id: string): Promise<void>
    {
        (await axios.delete(`${API_URL}/${id}`)).data;
    }
}
