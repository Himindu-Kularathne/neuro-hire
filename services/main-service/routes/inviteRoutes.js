/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/

const express = require("express");
const inviteRouter = express.Router();
const inviteController = require("../controllers/inviteController");
const authenticateToken = require("../middlewares/authMiddleware");
const attachProfileId = require("../middlewares/attachProfileId");

inviteRouter.post(
  "/",
  authenticateToken,
  attachProfileId,
  inviteController.sendInvite
);

module.exports = inviteRouter;
