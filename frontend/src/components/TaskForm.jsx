import { useState, useEffect } from "react";
import { MdAddTask, MdSave, MdCancel } from "react-icons/md";

const TaskForm = ({ onSubmit, editTask, onCancelEdit }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    onSubmit({ ...editTask, title, description });
    setTitle("");
    setDescription("");
    setError("");
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        {editTask ? <MdSave size={28} /> : <MdAddTask size={28} />}{" "}
        {editTask ? "Edit Task" : "Add New Task"}
      </h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Task Title *"
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <div className="flex justify-between gap-2 mt-2">
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-md flex items-center gap-2"
          >
            {editTask ? "Update" : "Add Task"} {editTask ? <MdSave /> : <MdAddTask />}
          </button>

          {editTask && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-xl hover:bg-gray-400 transition-all duration-300 shadow-md flex items-center gap-2"
            >
              Cancel <MdCancel />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;