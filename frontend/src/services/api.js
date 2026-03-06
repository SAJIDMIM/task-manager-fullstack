import axios from "axios";

// ✅ Base URL of your backend
const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend base URL
});

// ✅ Attach JWT token automatically for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ------------------ Auth APIs ------------------

// Signup a new user (identifier can be email or username)
export const signupUser = (userData) => API.post("/auth/signup", userData);

// Login existing user (identifier can be email or username)
export const loginUser = (userData) => API.post("/auth/login", userData);

// ------------------ Task APIs (protected) ------------------

// Fetch all tasks
export const fetchTasks = () => API.get("/tasks");

// Create a new task
export const createTask = (task) => API.post("/tasks", task);

// Update an existing task
export const updateTask = (id, updatedTask) => API.put(`/tasks/${id}`, updatedTask);

// Delete a task
export const deleteTask = (id) => API.delete(`/tasks/${id}`);