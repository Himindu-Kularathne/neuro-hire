const { rankResumes } = require("../services/resumeService");

const processResumes = async (req, res, next) => {
  try {
    const rankedResumes = await rankResumes(req.body);
    res.status(200).json(rankedResumes);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  processResumes,
};
