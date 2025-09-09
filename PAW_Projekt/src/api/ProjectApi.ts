import axios from 'axios';
import type { Project } from '../models/Project';

const API_URL = 'http://localhost:5000/api/projects';

export class ProjectApi
{
    static async getAll(): Promise<Project[]>
    {
        return (await axios.get<Project[]>(API_URL)).data;
    }

    static async getById(id: string): Promise<Project>
    {
        return (await axios.get<Project>(`${API_URL}/${id}`)).data;
    }

    static async create(project: Project): Promise<void>
    {
        (await axios.post<Project>(API_URL, project)).data;
    }

    static async update(id: string, project: Project): Promise<void>
    {
        (await axios.put<Project>(`${API_URL}/${id}`, project)).data;
    }

    static async delete(id: string): Promise<void>
    {
        (await axios.delete(`${API_URL}/${id}`)).data;
    }
}

