// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['superadmin', 'schooladmin'], required: true },
  // Add other user properties as needed
});

module.exports = mongoose.model('User', userSchema);
