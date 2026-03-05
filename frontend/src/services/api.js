import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // Your backend URL
});

// Optional: attach token for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const fetchTasks = () => API.get("/tasks");
export const createTask = (task) => API.post("/tasks", task);
export const updateTask = (id, updatedTask) => API.put(`/tasks/${id}`, updatedTask);
export const deleteTask = (id) => API.delete(`/tasks/${id}`);

export const loginUser = (userData) => API.post("/auth/login", userData);
export const signupUser = (userData) => API.post("/auth/signup", userData);