// routes/student.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student-controller');
const authMiddleware = require('../middleware/auth-mw'); // Import the auth middleware

// Create a new student (requires authentication and optionally authorization by schooladmins)
router.post(
  '/',
  authMiddleware('schooladmin'),
  studentController.createStudent
);

// Get a list of all students in a classroom
router.get('/:classroomId', studentController.getAllStudents);

// Get a single student by ID
router.get('/:studentId', studentController.getStudentById);

// Update an existing student (requires authentication and optionally authorization by schooladmins)
router.put(
  '/:studentId',
  authMiddleware('schooladmin'),
  studentController.updateStudent
);

// Delete a student (requires authentication and optionally authorization by schooladmins)
router.delete(
  '/:studentId',
  authMiddleware('schooladmin'),
  studentController.deleteStudent
);

module.exports = router;
