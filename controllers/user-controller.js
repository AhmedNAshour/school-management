// controllers/auth.js
const bcrypt = require('bcrypt');
const User = require('../models/user-model');

// Create a new user
exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;

  // Check if the provided role is valid (superadmin, schooladmin, or other roles)
  if (role !== 'superadmin' && role !== 'schooladmin' && role !== 'otherrole') {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with the specified role
    const newUser = new User({
      username,
      password: hashedPassword,
      role,
    });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a list of all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const { username, role } = req.body;
    const userId = req.params.userId;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await User.findByIdAndRemove(userId);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/auth.js
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create and return a JWT token for authentication
    // You can use libraries like 'jsonwebtoken' for this
    const token = generateToken(user);

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function generateToken(user) {
  // You can use 'jsonwebtoken' library to create a token
  const jwt = require('jsonwebtoken');
  const secretKey = process.env.JWT_SECRET;

  const payload = {
    userId: user._id,
    username: user.username,
    role: user.role,
  };

  const options = {
    expiresIn: '1h', // Token expiration time
  };

  return jwt.sign(payload, secretKey, options);
}
