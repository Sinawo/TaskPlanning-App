const fs = require('fs');
const path = require('path');

const tasksFilePath = path.join(__dirname, '../model/tasks.json');

// Function to load tasks from the JSON file
const loadTasks = () => {
    try {
        const data = fs.readFileSync(tasksFilePath);
        const parsedData = JSON.parse(data);
        return parsedData.tasks;
    } catch (error) {
        console.error('Error loading tasks:', error);
        return []; // Return an empty array in case of error
    }
};

// Load tasks at startup
let tasks = loadTasks();

// Add a new task
const addTask = (req, res) => {
    const { workspaceId, title, description, startDate, dueDate, assignedTo } = req.body;

    if (!workspaceId || !title || !description || !startDate || !dueDate || !assignedTo) {
        return res.status(400).json({ error: 'All fields are required: workspaceId, title, description, startDate, dueDate, assignedTo.' });
    }

    const newTask = {
        taskId: tasks.length + 1,
        workspaceId,
        title,
        description,
        startDate,
        dueDate,
        assignedTo,
        status: 'Pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    tasks.push(newTask);
    saveTasksToFile();

    res.status(201).json({ message: 'Task added successfully', task: newTask });
};

// Update an existing task
const updateTask = (req, res) => {
    const { taskId } = req.params;
    const { workspaceId, title, description, startDate, dueDate, assignedTo, status } = req.body;

    const task = tasks.find(t => t.taskId == taskId);
    if (!task) {
        return res.status(404).json({ error: 'Task not found.' });
    }

    if (workspaceId) task.workspaceId = workspaceId;
    if (title) task.title = title;
    if (description) task.description = description;
    if (startDate) task.startDate = startDate;
    if (dueDate) task.dueDate = dueDate;
    if (assignedTo) task.assignedTo = assignedTo;
    if (status) task.status = status;
    task.updatedAt = new Date().toISOString();

    saveTasksToFile();

    res.json({ message: 'Task updated successfully', task });
};

// Delete an existing task
const deleteTask = (req, res) => {
    const { taskId } = req.params;
    const taskIndex = tasks.findIndex(t => t.taskId == taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found.' });
    }

    tasks.splice(taskIndex, 1);
    saveTasksToFile();

    res.json({ message: 'Task deleted successfully' });
};

// View all tasks
const getAllTasks = (req, res) => {
    res.json(tasks);
};

// Save tasks to the JSON file
const saveTasksToFile = () => {
    const dataToSave = { tasks };
    fs.writeFileSync(tasksFilePath, JSON.stringify(dataToSave, null, 2));
};

// Export the task functions
module.exports = {
    addTask,
    updateTask,
    deleteTask,
    getAllTasks
};
