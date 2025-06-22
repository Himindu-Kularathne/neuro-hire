/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/

const express = require("express");
const inviteRoutes = express.Router();
const inviteController = require("../controllers/inviteController");

inviteRoutes.post("/", inviteController.sendInvite);

module.exports = inviteRoutes;
