import { MdDelete, MdEdit, MdCheckCircle, MdPendingActions } from "react-icons/md";

const TaskTable = ({ tasks, onDelete, onEdit, onToggleStatus }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-md rounded-xl">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Title</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Description</th>
            <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Status</th>
            <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Created Date</th>
            <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <tr key={task._id} className="hover:bg-gray-50 transition">
              <td className="px-6 py-4">{task.title}</td>
              <td className="px-6 py-4">{task.description || "-"}</td>
              <td className="px-6 py-4 text-center">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </td>
              <td className="px-6 py-4 text-center">
                {new Date(task.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-center flex justify-center gap-2">
                {/* ✅ Toggle Status Button */}
                <button
                  onClick={() => onToggleStatus(task)}
                  className={`px-3 py-1 rounded-xl flex items-center gap-1 transition ${
                    task.status === "Pending"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-yellow-500 text-white hover:bg-yellow-600"
                  }`}
                >
                  {task.status === "Pending" ? <MdCheckCircle /> : <MdPendingActions />}
                  {task.status === "Pending" ? "Complete" : "Mark Pending"}
                </button>

                {/* Edit */}
                <button
                  onClick={() => onEdit(task)}
                  className="text-gray-700 bg-gray-200 px-2 py-1 rounded-xl hover:bg-gray-300 transition flex items-center gap-1"
                >
                  <MdEdit /> Edit
                </button>

                {/* Delete */}
                <button
                  onClick={() => onDelete(task._id)}
                  className="text-white bg-red-600 px-2 py-1 rounded-xl hover:bg-red-700 transition flex items-center gap-1"
                >
                  <MdDelete /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;