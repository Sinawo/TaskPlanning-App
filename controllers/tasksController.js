// controllers/tasksController.js

// Get all tasks
const getAllTasks = (req, res) => {
    res.send('Retrieve all tasks');
};

// Create a new task
const createTask = (req, res) => {
    res.send('Create a new task');
};


const getTaskDetails = (req, res) => {
    // Your logic to get tasks
    res.json({ message: "Get tasks" });
};


module.exports = { getAllTasks, createTask, getTaskDetails };
