const Task = require("../models/Task");

/*
GET ALL TASKS
*/
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

/*
CREATE TASK
*/
exports.createTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;

    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Task title is required"
      });
    }

    const task = new Task({
      title,
      description,
      status
    });

    await task.save();

    res.status(201).json({
      message: "Task created successfully",
      task
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating task"
    });
  }
};

/*
UPDATE TASK
*/
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title cannot be empty"
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task updated successfully",
      task: updatedTask
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating task"
    });
  }
};

/*
DELETE TASK
*/
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    res.status(200).json({
      message: "Task deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting task"
    });
  }
};