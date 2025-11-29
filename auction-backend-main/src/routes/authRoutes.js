const express = require('express');
const router = express.Router();

const { registerUser, loginUser, getMe } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// test route just to prove router is working
router.get('/ping', (req, res) => {
  res.json({ route: 'auth', status: 'ok' });
});

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);

// Current user (protected)
router.get('/me', authMiddleware, getMe);

module.exports = router;
