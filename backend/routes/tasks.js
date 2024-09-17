const express = require("express");
const Task = require("../models/task");
const jwt = require("jsonwebtoken");
const router = express.Router();

// jwt wala middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token from 'Bearer <token>'

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// kewal unka task milega jo register hai
router.get("/", authenticateToken, async (req, res) => {
  try {
    console.log(`Fetching tasks for userId: ${req.user.userId}`); // Debugging info
    const tasks = await Task.find({ userId: req.user.userId }); // Get tasks by userId from the token

    if (!tasks || tasks.length === 0) {
      console.log("No tasks found for this user"); // Debugging info
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    res.json(tasks);
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    res.status(500).json({ message: "Server error while fetching tasks" });
  }
});

// jo authenticated hai unka task post kro
router.post("/", authenticateToken, async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Task name and description are required" });
  }

  try {
    const newTask = new Task({
      name,
      description,
      userId: req.user.userId,
    });
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("Error adding task:", err.message);
    res.status(500).json({ message: "Server error while adding task" });
  }
});

// task delete kr do
router.delete("/:taskId", authenticateToken, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.taskId,
      userId: req.user.userId,
    });
    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err.message);
    res.status(500).json({ message: "Server error while deleting task" });
  }
});

// task update ho ra
router.put("/:taskId", authenticateToken, async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res
      .status(400)
      .json({ message: "Task name and description are required" });
  }

  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.taskId, userId: req.user.userId },
      { name, description },
      { new: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ message: "Task not found or unauthorized" });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err.message);
    res.status(500).json({ message: "Server error while updating task" });
  }
});

module.exports = router;
