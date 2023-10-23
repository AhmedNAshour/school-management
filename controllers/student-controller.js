// controllers/student.js
const Student = require('../models/student-model');

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const { name, age, grade } = req.body;
    const student = new Student({
      name,
      age,
      grade,
      classroom: req.params.classroomId,
    });
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a list of all students in a classroom
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({ classroom: req.params.classroomId });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single student by ID
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing student
exports.updateStudent = async (req, res) => {
  try {
    const { name, age, grade } = req.body;
    const studentId = req.params.studentId;
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { name, age, grade },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(updatedStudent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.studentId;
    const deletedStudent = await Student.findByIdAndRemove(studentId);
    if (!deletedStudent) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.json(deletedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
