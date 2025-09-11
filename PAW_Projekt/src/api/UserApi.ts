import axios from 'axios';
import type { User } from '../models/User';

const API_URL = 'http://localhost:5000/api/users';

export class UserApi
{
    static async getAll(): Promise<User[]>
    {
        return (await axios.get<User[]>(API_URL)).data;
    }

    static async getById(id: string): Promise<User>
    {
        return (await axios.get<User>(`${API_URL}/${id}`)).data;
    }
}
