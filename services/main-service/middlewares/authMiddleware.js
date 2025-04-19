const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token required' });

  console.log("Token from header:", token);
  console.log("JWT Secret:", process.env.JWT_SECRET);
  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    console.log("Payload from token:", err);
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    console.log("Decoded payload:", payload);
    req.user = payload.user;
    next();
  });
};

module.exports = authenticateToken;
