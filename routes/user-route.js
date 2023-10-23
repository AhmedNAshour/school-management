// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-mw'); // Import the auth middleware

// Create a new user (for registration or internal user management)
router.post('/', authMiddleware('superadmin'), userController.createUser);
// Login route
router.post('/login', userController.login);
// Get a list of all users (requires superadmin role)
router.get('/', authMiddleware('superadmin'), userController.getAllUsers);

// Get a single user by ID (requires superadmin role)
router.get(
  '/:userId',
  authMiddleware('superadmin'),
  userController.getUserById
);

// Update an existing user (requires superadmin role)
router.put('/:userId', authMiddleware('superadmin'), userController.updateUser);

// Delete a user (requires superadmin role)
router.delete(
  '/:userId',
  authMiddleware('superadmin'),
  userController.deleteUser
);

module.exports = router;
