const express = require("express");
const inviteRoutes = express.Router();
const inviteController = require("../controllers/inviteController");

inviteRoutes.post("/", inviteController.sendInvite);

module.exports = inviteRoutes;
