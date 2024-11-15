// routes/workspaces.js
const express = require('express');
const router = express.Router();
const workspacesController = require('../controllers/workspacesController');

router.get('/', workspacesController.getAllWorkspaces);
router.post('/', workspacesController.registerWorkspace);
router.put('/:workspaceId', workspacesController.updateWorkspace);
router.delete('/:workspaceId', workspacesController.deleteWorkspace);
router.get('/:workspaceId', workspacesController.getWorkspaceById);

module.exports = router;
