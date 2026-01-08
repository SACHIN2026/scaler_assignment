const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Only keep profile route for demo
router.get('/profile/:userId', userController.getProfile);

module.exports = router;