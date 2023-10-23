// controllers/classroom.js
const Classroom = require('../models/classroom-model');

// Create a new classroom
exports.createClassroom = async (req, res) => {
  try {
    const { name, capacity } = req.body;
    const classroom = new Classroom({
      name,
      capacity,
      school: req.params.schoolId,
    });
    const newClassroom = await classroom.save();
    res.status(201).json(newClassroom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a list of all classrooms in a school
exports.getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find({ school: req.params.schoolId });
    res.json(classrooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single classroom by ID
exports.getClassroomById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.classroomId);
    if (!classroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }
    res.json(classroom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing classroom
exports.updateClassroom = async (req, res) => {
  try {
    const { name, capacity } = req.body;
    const classroomId = req.params.classroomId;
    const updatedClassroom = await Classroom.findByIdAndUpdate(
      classroomId,
      { name, capacity },
      { new: true }
    );
    if (!updatedClassroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }
    res.json(updatedClassroom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a classroom
exports.deleteClassroom = async (req, res) => {
  try {
    const classroomId = req.params.classroomId;
    const deletedClassroom = await Classroom.findByIdAndRemove(classroomId);
    if (!deletedClassroom) {
      return res.status(404).json({ error: 'Classroom not found' });
    }
    res.json(deletedClassroom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
