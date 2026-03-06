import { useState } from "react";
import { MdDelete, MdEdit, MdCheckCircle, MdPendingActions } from "react-icons/md";

const TaskTable = ({ tasks, onDelete, onEdit, onToggleStatus }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Pagination calculations
  const indexOfLast = currentPage * recordsPerPage;
  const indexOfFirst = indexOfLast - recordsPerPage;
  const currentTasks = tasks.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(tasks.length / recordsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

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
    <div className="bg-white shadow-md rounded-xl p-4">

      {/* TABLE */}
      <div className="overflow-x-auto">
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

            {currentTasks.map((task) => (
              <tr key={task._id} className="hover:bg-gray-50">

                <td className="px-6 py-4">{task.title}</td>

                <td className="px-6 py-4">{task.description || "-"}</td>

                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                    {task.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-center">
                  {new Date(task.createdAt).toLocaleDateString()}
                </td>

                {/* ACTION BUTTONS */}
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-2 flex-wrap">

                    <button
                      onClick={() => onToggleStatus(task)}
                      className={`px-3 py-1 rounded-lg flex items-center gap-1 text-sm transition
                      ${task.status === "Pending"
                          ? "bg-blue-600 text-white hover:bg-blue-700"
                          : "bg-yellow-500 text-white hover:bg-yellow-600"}`}
                    >
                      {task.status === "Pending" ? <MdCheckCircle /> : <MdPendingActions />}
                      {task.status === "Pending" ? "Complete" : "Pending"}
                    </button>

                    <button
                      onClick={() => onEdit(task)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300"
                    >
                      <MdEdit /> Edit
                    </button>

                    <button
                      onClick={() => onDelete(task._id)}
                      className="flex items-center gap-1 px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      <MdDelete /> Delete
                    </button>

                  </div>
                </td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-2 mt-6">

        <button
          onClick={prevPage}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          {"<"}
        </button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded
            ${currentPage === i + 1 ? "bg-indigo-600 text-white" : "hover:bg-gray-100"}`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={nextPage}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          {">"}
        </button>

      </div>

    </div>
  );
};

export default TaskTable;