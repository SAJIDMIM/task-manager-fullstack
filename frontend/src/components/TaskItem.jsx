import { deleteTask, updateTask } from "../services/api";

const TaskItem = ({ task, setTasks, setEditingTask }) => {
  const toggleStatus = async () => {
    const updated = { ...task, status: task.status === "Pending" ? "Completed" : "Pending" };
    await updateTask(task._id, updated);
    setTasks(prev => prev.map(t => t._id === task._id ? updated : t));
  };

  const removeTask = async () => {
    await deleteTask(task._id);
    setTasks(prev => prev.filter(t => t._id !== task._id));
  };

  return (
    <div className={`p-4 rounded shadow ${task.status === "Completed" ? "bg-green-100" : "bg-gray-100"}`}>
      <h3 className="font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
      <div className="mt-2 flex gap-2">
        <button onClick={() => setEditingTask(task)} className="btn btn-sm btn-primary">Edit</button>
        <button onClick={toggleStatus} className="btn btn-sm btn-success">Toggle Status</button>
        <button onClick={removeTask} className="btn btn-sm btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;