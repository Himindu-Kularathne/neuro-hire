/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/

const express = require("express");
const profileRouter = express.Router();
const profileController = require("../controllers/profileController");
const authenticateToken = require("../middlewares/authMiddleware");
const attachProfileId = require("../middlewares/attachProfileId");

profileRouter.post("/", profileController.createProfile);
// profileRouter.get('/', profileController.getAllProfiles);
profileRouter.get(
  "/",
  authenticateToken,
  attachProfileId,
  profileController.getProfile
);
profileRouter.put(
  "/",
  authenticateToken,
  attachProfileId,
  profileController.updateProfile
);
profileRouter.patch(
  "/",
  authenticateToken,
  attachProfileId,
  profileController.deleteProfile
);

module.exports = profileRouter;
