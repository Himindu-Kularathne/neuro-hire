const express = require('express');
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler');
const profileRoutes = require('./routes/profileRoutes');
const jobRouts = require('./routes/jobRouts');
const cors = require('cors');
const { log } = require('./utils/logger');


const app = express();
app.use(cors(
//   {
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }
));
const port = 3000;

app.use(bodyParser.json());

//--- health check ---
app.get('/', (req, res) => {
  res.status(200).json({ message : "upstream service is healthy" });
});

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/job', jobRouts);

// Error Handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
  log(`Server is running on http://localhost:${port}`);
});
