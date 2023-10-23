// routes/classroom.js
const express = require('express');
const router = express.Router();
const classroomController = require('../controllers/classroom-controller');
const authMiddleware = require('../middleware/auth-mw'); // Import the auth middleware

// Create a new classroom (requires authentication and optionally authorization by schooladmins)
router.post(
  '/',
  authMiddleware('schooladmin'),
  classroomController.createClassroom
);

// Get a list of all classrooms in a school
router.get('/:schoolId', classroomController.getAllClassrooms);

// Get a single classroom by ID
router.get('/:classroomId', classroomController.getClassroomById);

// Update an existing classroom (requires authentication and optionally authorization by schooladmins)
router.put(
  '/:classroomId',
  authMiddleware('schooladmin'),
  classroomController.updateClassroom
);

// Delete a classroom (requires authentication and optionally authorization by schooladmins)
router.delete(
  '/:classroomId',
  authMiddleware('schooladmin'),
  classroomController.deleteClassroom
);

module.exports = router;
