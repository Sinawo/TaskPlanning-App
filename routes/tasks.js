const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController');

router.get('/', tasksController.getAllTasks);
router.post('/', tasksController.createTask);
router.get('/:taskId', tasksController.getTaskDetails);

module.exports = router;
