const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

// Define routes for tasks
router.get('/', tasksController.getAllTasks); // View all tasks
router.post('/', tasksController.addTask); // Add a new task
router.put('/:taskId', tasksController.updateTask); // Update an existing task
router.delete('/:taskId', tasksController.deleteTask); // Delete a task

module.exports = router;
