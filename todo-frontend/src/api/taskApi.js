import axios from "axios";
import { getUserId } from "../utils/user";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  config.headers["X-User-Id"] = getUserId();
  return config;
});

export const getTasks = () => API.get("/tasks");
export const createTask = (data) => API.post("/tasks", data);
export const updateTask = (id, data) => API.put(`/tasks/${id}`, data);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);
export const completeTask = (id) => API.patch(`/tasks/${id}/complete`);
