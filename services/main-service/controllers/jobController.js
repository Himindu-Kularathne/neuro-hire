const jobService = require("../services/jobService");

const createJob = async (req, res, next) => {
  try {
    const profileId = req.profileId;
    const job = {
      ...req.body,
      profile_id: profileId,
    };

    const result = await jobService.insertJobWithSkills(job);
    res.status(201).json({
      message: "Job inserted successfully",
      insertId: result.insertId,
    });
  } catch (err) {
    next(err);
  }
};

const getAllJobs = async (req, res, next) => {
  try {
    const profileId = req.profileId;
    const jobs = await jobService.getAllJobs(profileId);
    res.status(200).json(jobs);
  } catch (err) {
    next(err);
  }
};

const updateJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const profileId = req.profileId;
    const job = {
      ...req.body,
      profile_id: profileId,
    };
    const updatedJob = await jobService.updateJob(jobId, job);
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(updatedJob);
  } catch (err) {
    next(err);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const jobId = req.params.jobId;
    const profileId = req.profileId;
    const deletedJob = await jobService.deleteJob(jobId, profileId);
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createJob, getAllJobs, updateJob, deleteJob };
