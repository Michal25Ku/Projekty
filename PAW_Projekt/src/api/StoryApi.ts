import axios from 'axios';
import type { Story } from '../models/Story';

const API_URL = 'http://localhost:5000/api/stories';

export const getAllStories = async (projectId: string) => (await axios.get<Story[]>(`${API_URL}?project=${projectId}`)).data;
export const getByIdStory = async (id: string) => (await axios.get<Story>(`${API_URL}/${id}`)).data;
export const createStory = async (story: Story) => (await axios.post<Story>(API_URL, story)).data;
export const updateStory = async (id: string, story: Story) => (await axios.put<Story>(`${API_URL}/${id}`, story)).data;
export const deleteStory = async (id: string) => (await axios.delete(`${API_URL}/${id}`)).data;
