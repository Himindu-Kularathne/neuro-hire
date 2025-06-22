/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/

const express = require("express");
const resumeRouter = express.Router();
const resumeController = require("../controllers/resumeController");

resumeRouter.post("/process", resumeController.processResumes);

module.exports = resumeRouter;
