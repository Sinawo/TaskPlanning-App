const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');


router.get('/all-users', usersController.getAllUsers);
router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);

router.get('/:username', usersController.getUserDetails);

module.exports = router;
