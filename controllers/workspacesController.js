const getAllWorkspaces = (req, res) => {
    res.send('Get all workspaces');
};

// Function to create a new workspace
const createWorkspace = (req, res) => {
    res.send('Create a new workspace');
};

module.exports = { getAllWorkspaces, createWorkspace };