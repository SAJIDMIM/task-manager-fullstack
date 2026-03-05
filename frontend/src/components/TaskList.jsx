import TaskItem from "./TaskItem";

const TaskList = ({ tasks, setTasks, setEditingTask }) => {
  return (
    <div className="mt-4 grid gap-4">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} setTasks={setTasks} setEditingTask={setEditingTask} />
      ))}
    </div>
  );
};

export default TaskList;