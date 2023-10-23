const connectDB = require('./config/config');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

// Load environment variables
dotenv.config({ path: './config/config.env' });
// Connect to MongoDB
connectDB();
// Other setup and middleware configurations here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Define and use your routes
const schoolRoutes = require('./routes/school-route');
const classroomRoutes = require('./routes/classroom-route');
const studentRoutes = require('./routes/student-route');
const userRoutes = require('./routes/user-route');

app.use('/api/schools', schoolRoutes);
app.use('/api/classrooms', classroomRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
