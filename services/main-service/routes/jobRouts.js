const express = require("express");
const jobRouter = express.Router();
const jobController = require("../controllers/jobController");
const authenticateToken = require("../middlewares/authMiddleware");
const authorizeRoles = require("../middlewares/roleMiddleware");
const attachProfileId = require("../middlewares/attachProfileId");

jobRouter.post(
  "/",
  authenticateToken,
  authorizeRoles("recruiter", "admin", "seeker"),
  attachProfileId,
  jobController.createJob
);
jobRouter.get(
  "/",
  authenticateToken,
  attachProfileId,
  jobController.getAllJobs
);
jobRouter.put(
  "/:jobId",
  authenticateToken,
  attachProfileId,
  jobController.updateJob
);
jobRouter.delete(
  "/:jobId",
  authenticateToken,
  attachProfileId,
  jobController.deleteJob
);

module.exports = jobRouter;
