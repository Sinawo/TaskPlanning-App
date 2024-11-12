const express = require('express');
const router = express.Router();
const workspacesController = require('../controllers/workspacesController');

router.get('/', workspacesController.getAllWorkspaces);
router.post('/', workspacesController.createWorkspace);

module.exports = router;
