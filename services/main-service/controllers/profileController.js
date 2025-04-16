const profileService = require('../services/profileService');

const createProfile = async (req, res, next) => {
  try {
    const result = await profileService.insertProfile(req.body);
    res.status(201).json({ message: 'Profile inserted successfully', insertId: result.insertId });
  } catch (err) {
    next(err);
  }
};

const getAllProfiles = async (req, res, next) => {
    try {
        const profiles = await profileService.getAllProfiles();
        res.status(200).json(profiles);
    } catch (err) {
        next(err);
    }
}

const getProfile = async (req, res, next) => {
    try {
        const profileId = req.params.profileId;
        const profile = await profileService.getProfile(profileId);
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (err) {
        next(err);
    }
}

const updateProfile = async (req, res, next) => {
    try {
        const profileId = req.params.profileId;
        const updatedProfile = await profileService.updateProfile(profileId, req.body);
        if (!updatedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
        next(err);
    }
}

const deleteProfile = async (req, res, next) => {
    try {
        const profileId = req.params.profileId;
        const deletedProfile = await profileService.deleteProfile(profileId);
        if (!deletedProfile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (err) {
        next(err);
    }
}

module.exports = { createProfile , getAllProfiles, getProfile, updateProfile, deleteProfile };
