// middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = (role) => {
  return (req, res, next) => {
    // Get the token from the request header
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify the token with your secret key
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      // Check the user's role for authorization
      const userRole = decoded.role;

      if (
        userRole === 'superadmin' ||
        (userRole === 'schooladmin' && role === 'schooladmin')
      ) {
        // Superadmins always have access, and schooladmins have access when 'role' matches
        next();
      } else {
        return res.status(403).json({ error: 'Access forbidden' });
      }
    });
  };
};
