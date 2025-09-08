import axios from 'axios';
import type { User } from '../models/User';

const API_URL = 'http://localhost:5000/api/users';

export const getAllUsers = async () => (await axios.get<User[]>(API_URL)).data;
export const getByIdUser = async (id: string) => (await axios.get<User>(`${API_URL}/${id}`)).data;
