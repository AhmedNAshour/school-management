// controllers/school.js
const School = require('../models/school-model');

// Create a new school
exports.createSchool = async (req, res) => {
  try {
    const { name, location } = req.body;
    const school = new School({ name, location });
    const newSchool = await school.save();
    res.status(201).json(newSchool);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a list of all schools
exports.getAllSchools = async (req, res) => {
  try {
    const schools = await School.find();
    res.json(schools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing school
exports.updateSchool = async (req, res) => {
  try {
    const { name, location } = req.body;
    const schoolId = req.params.schoolId;
    const updatedSchool = await School.findByIdAndUpdate(
      schoolId,
      { name, location },
      { new: true }
    );
    if (!updatedSchool) {
      return res.status(404).json({ error: 'School not found' });
    }
    res.json(updatedSchool);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single school by ID
exports.getSchoolById = async (req, res) => {
  try {
    const school = await School.findById(req.params.schoolId);
    if (!school) {
      return res.status(404).json({ error: 'School not found' });
    }
    res.json(school);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a school
exports.deleteSchool = async (req, res) => {
  try {
    const schoolId = req.params.schoolId;
    const deletedSchool = await School.findByIdAndRemove(schoolId);
    if (!deletedSchool) {
      return res.status(404).json({ error: 'School not found' });
    }
    res.json(deletedSchool);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
