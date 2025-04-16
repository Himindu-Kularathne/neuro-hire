const express = require('express');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth server running on port ${PORT}`));
