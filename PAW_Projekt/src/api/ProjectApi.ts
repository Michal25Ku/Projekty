import axios from 'axios';
import type { Project } from '../models/Project';

const API_URL = 'http://localhost:5000/api/projects';

export const getAllProjects = async () => (await axios.get<Project[]>(API_URL)).data;
export const getByIdProject = async (id: string) => (await axios.get<Project>(`${API_URL}/${id}`)).data;
export const createProject = async (project: Project) => (await axios.post<Project>(API_URL, project)).data;
export const updateProject = async (id: string, project: Project) => (await axios.put<Project>(`${API_URL}/${id}`, project)).data;
export const deleteProject = async (id: string) => (await axios.delete(`${API_URL}/${id}`)).data;
