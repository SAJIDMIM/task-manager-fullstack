
Task Manager - Full Stack Application

A simple Task Manager web application built with React.js, Node.js, Express.js, and MongoDB.
Users can register, login, and manage tasks securely with JWT authentication.


🌟 Features
User Authentication

Sign Up / Register

Login using email & password

JWT-based authentication for secure API access

Protected routes for task management

Frontend (React.js)

Responsive Dashboard displaying all tasks:

Title, Description, Status, Created Date

Add Task form with validation (title required)

Edit Task functionality

Delete Task

Mark Task as Completed / Pending

Visual indicator for completed tasks

Optional:

Search tasks by title or description

Pagination (20 tasks per page)

JWT token is stored securely in local storage for API requests

Backend (Node.js + Express)

RESTful API with authentication:

POST /api/auth/signup - Register new user

POST /api/auth/login - Login and get JWT token

Task endpoints (protected):

GET /api/tasks - Get all tasks

POST /api/tasks - Create a new task

PUT /api/tasks/:id - Update a task

DELETE /api/tasks/:id - Delete a task

Error handling for invalid requests and authentication

JWT middleware to secure task routes

⚙️ Prerequisites

Node.js (v18+ recommended)

npm or yarn

MongoDB (local or Atlas cluster)

1️⃣ Backend Setup

Navigate to backend folder:

cd backend

Install dependencies:

npm install

Create a .env file:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Start the server:

npm run dev

Server will run at http://localhost:5000

2️⃣ Frontend Setup

Navigate to frontend folder:

cd frontend

Install dependencies:

npm install

Start the React app:

npm start

App will run at http://localhost:3000



💻 Technologies Used

Frontend: React.js, Tailwind CSS / Bootstrap, Axios, React Hooks

Backend: Node.js, Express.js, Mongoose, JWT

Database: MongoDB (Atlas or local)

Version Control: Git & GitHub


📌 GitHub Repository

Repository: https://github.com/SAJIDMIM/task-manager-fullstack


📜 License

This project is open-source under the MIT License.
