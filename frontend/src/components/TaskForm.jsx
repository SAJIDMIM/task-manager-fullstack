import { useState, useEffect } from "react";
import { createTask, updateTask } from "../services/api";

const TaskForm = ({ tasks, setTasks, editingTask, setEditingTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
    }
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Title is required!");

    if (editingTask) {
      const updated = { ...editingTask, title, description };
      await updateTask(editingTask._id, updated);
      setTasks(tasks.map(t => t._id === editingTask._id ? updated : t));
      setEditingTask(null);
    } else {
      const { data } = await createTask({ title, description, status: "Pending" });
      setTasks([data, ...tasks]);
    }

    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <input
        type="text"
        value={title}
        placeholder="Task title"
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <textarea
        value={description}
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded w-full mb-2"
      />
      <button type="submit" className="btn btn-primary">{editingTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TaskForm;