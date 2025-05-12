const express = require("express");
const resumeRouter = express.Router();
const resumeController = require("../controllers/resumeController");

resumeRouter.post("/process", resumeController.processResumes);

module.exports = resumeRouter;
