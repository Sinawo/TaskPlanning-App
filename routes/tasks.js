const express = require('express');
const router = express.Router();
const connection = require('../db'); // Adjust path if needed

// Define CRUD routes here
router.post('/tasks', (req, res) => {
    const { workspace_id, title, description, start_date, due_date, assigned_to, status } = req.body;
    const query = 'INSERT INTO tasks (workspace_id, title, description, start_date, due_date, assigned_to, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [workspace_id, title, description, start_date, due_date, assigned_to, status], (err, result) => {
        if (err) {
            res.status(500).send('Error creating task');
        } else {
            res.status(201).send({ message: 'Task created', taskId: result.insertId });
        }
    });
});

// Create a new task
router.post('/tasks', (req, res) => {
    const { workspace_id, title, description, start_date, due_date, assigned_to, status } = req.body;
    const query = 'INSERT INTO tasks (workspace_id, title, description, start_date, due_date, assigned_to, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [workspace_id, title, description, start_date, due_date, assigned_to, status], (err, result) => {
        if (err) {
            res.status(500).send('Error creating task');
        } else {
            res.status(201).send({ message: 'Task created', taskId: result.insertId });
        }
    });
});

// Read tasks
router.get('/tasks', (req, res) => {
    connection.query('SELECT * FROM tasks', (err, results) => {
        if (err) {
            res.status(500).send('Error retrieving tasks');
        } else {
            res.status(200).json(results);
        }
    });
});

// Update a task
router.put('/tasks/:id', (req, res) => {
    const { title, description, start_date, due_date, assigned_to, status } = req.body;
    const query = 'UPDATE tasks SET title = ?, description = ?, start_date = ?, due_date = ?, assigned_to = ?, status = ? WHERE task_id = ?';
    connection.query(query, [title, description, start_date, due_date, assigned_to, status, req.params.id], (err) => {
        if (err) {
            res.status(500).send('Error updating task');
        } else {
            res.status(200).send('Task updated');
        }
    });
});

// Delete a task
router.delete('/tasks/:id', (req, res) => {
    connection.query('DELETE FROM tasks WHERE task_id = ?', [req.params.id], (err) => {
        if (err) {
            res.status(500).send('Error deleting task');
        } else {
            res.status(200).send('Task deleted');
        }
    });
});

module.exports = router;