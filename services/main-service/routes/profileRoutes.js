const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/', profileController.createProfile);
router.get('/', profileController.getAllProfiles);
router.get('/:profileId', profileController.getProfile);
router.put('/:profileId', profileController.updateProfile);
router.delete('/:profileId', profileController.deleteProfile);

module.exports = router;
