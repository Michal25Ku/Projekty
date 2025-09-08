import axios from 'axios';
import type { Task } from '../models/Task';

const API_URL = 'http://localhost:5000/api/tasks';

export const getAllTasks = async (storyId: string) => (await axios.get<Task[]>(`${API_URL}?story=${storyId}`)).data;
export const getByIdTask = async (id: string) => (await axios.get<Task>(`${API_URL}/${id}`)).data;
export const createTask = async (task: Task) => (await axios.post<Task>(API_URL, task)).data;
export const updateTask = async (id: string, task: Task) => (await axios.put<Task>(`${API_URL}/${id}`, task)).data;
export const deleteTask = async (id: string) => (await axios.delete(`${API_URL}/${id}`)).data;
