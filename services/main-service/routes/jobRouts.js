const express = require('express');
const jobRouter = express.Router();
const jobController =   require('../controllers/jobController');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/roleMiddleware');

jobRouter.post('/', authenticateToken, authorizeRoles('recruiter', 'admin') ,jobController.createJob);
jobRouter.get('/:profileId', jobController.getAllJobs);
jobRouter.put('/:jobId', jobController.updateJob);

module.exports = jobRouter  ;