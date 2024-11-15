// controllers/workspacesController.js
const fs = require('fs');
const path = require('path');

// Path to the workspaces JSON file
const workspacesFilePath = path.join(__dirname, '../model/workspaces.json');

// Function to read workspaces from the JSON file
const readWorkspacesFromFile = () => {
    const data = fs.readFileSync(workspacesFilePath);
    return JSON.parse(data).workspaces;
};

// Function to save workspaces to the JSON file
const saveWorkspacesToFile = (workspaces) => {
    fs.writeFileSync(workspacesFilePath, JSON.stringify({ workspaces }, null, 2));
};

// Get all workspaces
const getAllWorkspaces = (req, res) => {
    const workspaces = readWorkspacesFromFile();
    res.json(workspaces);
};

// Register a new workspace
const registerWorkspace = (req, res) => {
    const { workspaceName, description } = req.body;

    if (!workspaceName) {
        return res.status(400).json({ error: 'Workspace name is required.' });
    }

    const workspaces = readWorkspacesFromFile();
    const workspaceId = workspaces.length ? workspaces[workspaces.length - 1].workspaceId + 1 : 1;

    const newWorkspace = {
        workspaceId,
        workspaceName,
        description,
        createdAt: new Date().toISOString()
    };

    workspaces.push(newWorkspace);
    saveWorkspacesToFile(workspaces);
    res.status(201).json(newWorkspace);
};

// Update an existing workspace
const updateWorkspace = (req, res) => {
    const { workspaceId } = req.params;
    const { workspaceName, description } = req.body;

    const workspaces = readWorkspacesFromFile();
    const workspaceIndex = workspaces.findIndex(ws => ws.workspaceId === parseInt(workspaceId));

    if (workspaceIndex === -1) {
        return res.status(404).json({ error: 'Workspace not found.' });
    }

    if (workspaceName) {
        workspaces[workspaceIndex].workspaceName = workspaceName;
    }
    if (description) {
        workspaces[workspaceIndex].description = description;
    }
    workspaces[workspaceIndex].updatedAt = new Date().toISOString();

    saveWorkspacesToFile(workspaces);
    res.json(workspaces[workspaceIndex]);
};

// Delete a workspace
const deleteWorkspace = (req, res) => {
    const { workspaceId } = req.params;

    let workspaces = readWorkspacesFromFile();
    const initialLength = workspaces.length;
    workspaces = workspaces.filter(ws => ws.workspaceId !== parseInt(workspaceId));

    if (workspaces.length === initialLength) {
        return res.status(404).json({ error: 'Workspace not found.' });
    }

    saveWorkspacesToFile(workspaces);
    res.status(204).send();
};

// Get workspace by ID
const getWorkspaceById = (req, res) => {
    const { workspaceId } = req.params;
    const workspaces = readWorkspacesFromFile();
    const workspace = workspaces.find(ws => ws.workspaceId === parseInt(workspaceId));

    if (!workspace) {
        return res.status(404).json({ error: 'Workspace not found.' });
    }

    res.json(workspace);
};

module.exports = {
    getAllWorkspaces,
    registerWorkspace,
    updateWorkspace,
    deleteWorkspace,
    getWorkspaceById
};
