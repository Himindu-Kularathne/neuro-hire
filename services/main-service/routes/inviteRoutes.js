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
