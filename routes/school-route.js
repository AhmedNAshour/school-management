// routes/school.js
const express = require('express');
const router = express.Router();
const schoolController = require('../controllers/school-controller');
const authMiddleware = require('../middleware/auth-mw'); // Import the auth middleware

// Create a new school (requires authentication and optionally authorization by schooladmins)
router.post('/', authMiddleware('superadmin'), schoolController.createSchool);

// Get a list of all schools
router.get('/', schoolController.getAllSchools);

// Get a single school by ID
router.get('/:schoolId', schoolController.getSchoolById);

// Update an existing school
router.put(
  '/:schoolId',
  authMiddleware('superadmin'),
  schoolController.updateSchool
);

// Delete a school
router.delete(
  '/:schoolId',
  authMiddleware('superadmin'),
  schoolController.deleteSchool
);

module.exports = router;
