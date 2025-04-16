const express = require('express');
const profileRouter = express.Router();
const profileController = require('../controllers/profileController');

profileRouter.post('/', profileController.createProfile);
profileRouter.get('/', profileController.getAllProfiles);
profileRouter.get('/:profileId', profileController.getProfile);
profileRouter.put('/:profileId', profileController.updateProfile);
profileRouter.delete('/:profileId', profileController.deleteProfile);

module.exports = profileRouter;
