// models/student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
  },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School',
    required: true,
  },
  dateOfBirth: { type: Date },
  contactInfo: {
    email: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  // Add other properties like parent/guardian information, performance, or extracurricular activities.
});

module.exports = mongoose.model('Student', studentSchema);
