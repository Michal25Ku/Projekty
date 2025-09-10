import axios from 'axios';
import type { Story } from '../models/Story';

const API_URL = 'http://localhost:5000/api/stories';

export class StoryApi
{
    static async getAll(): Promise<Story[]>
    {
        return (await axios.get<Story[]>(API_URL)).data;
    }

    static async getByProject(projectId: string): Promise<Story[]> 
    {
        return (await axios.get<Story[]>(`${API_URL}/project/${projectId}`)).data;
    }

    static async getById(id: string): Promise<Story>
    {
        return (await axios.get<Story>(`${API_URL}/${id}`)).data;
    }

    static async create(story: Story): Promise<void>
    {
        (await axios.post<Story>(API_URL, story)).data;
    }

    static async update(id: string, story: Story): Promise<void>
    {
        (await axios.put<Story>(`${API_URL}/${id}`, story)).data;
    }

    static async delete(id: string): Promise<void>
    {
        (await axios.delete(`${API_URL}/${id}`)).data;
    }
}
