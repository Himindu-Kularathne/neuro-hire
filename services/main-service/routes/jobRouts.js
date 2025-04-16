const express = require('express');
const jobRouter = express.Router();
const jobController =   require('../controllers/jobController');

jobRouter.post('/', jobController.createJob);
jobRouter.get('/:profileId', jobController.getAllJobs);
jobRouter.put('/:jobId', jobController.updateJob);

module.exports = jobRouter  ;