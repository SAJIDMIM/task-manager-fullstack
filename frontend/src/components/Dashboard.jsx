import { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskTable from "./TaskTable";
import { fetchTasks, createTask, updateTask, deleteTask } from "../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 20; // Pagination limit

  // Load tasks from backend
  const loadTasks = async () => {
    try {
      const { data } = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleAddOrEdit = async (task) => {
    if (task._id) {
      await updateTask(task._id, task);
    } else {
      await createTask(task);
    }
    setEditTask(null);
    loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  const handleToggleStatus = async (task) => {
    await updateTask(task._id, {
      ...task,
      status: task.status === "Pending" ? "Completed" : "Pending",
    });
    loadTasks();
  };

  // Filter tasks by search query
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Task Form Card */}
        <div className="lg:col-span-1">
          <TaskForm
            onSubmit={handleAddOrEdit}
            editTask={editTask}
            onCancelEdit={() => setEditTask(null)}
          />
        </div>

        {/* Task Table with search & pagination */}
        <div className="lg:col-span-3">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search by title..."
              className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Task Table */}
          <TaskTable
            tasks={currentTasks}
            onDelete={handleDelete}
            onEdit={setEditTask}
            onToggleStatus={handleToggleStatus}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-full border ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
                  } transition`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;