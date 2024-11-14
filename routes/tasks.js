const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');
const { loginUser, signupUser } = require('../controllers/authController');

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);


// Define routes for tasks
router.get('/', tasksController.getAllTasks); // View all tasks

router.post('/', tasksController.addTask); // Add a new task
router.put('/:taskId', tasksController.updateTask); // Update an existing task
router.get('/:taskId', tasksController.getTaskById); // Update an existing task

router.delete('/:taskId', tasksController.deleteTask); // Delete a task

module.exports = router;
