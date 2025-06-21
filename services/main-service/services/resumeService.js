require("dotenv").config();

const rankResumes = async (payload) => {
  if (!process.env.RESUME_RANKING_API_BASE_URL) {
    throw new Error("Resume ranking API base URL is not configured");
  }
  try {
    const rankedResumeResponse = await fetch(
      `${process.env.RESUME_RANKING_API_BASE_URL}/rank`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (!rankedResumeResponse.ok) {
      throw new Error("Resume ranking service failed");
    }
    const rankedResumeIds = await rankedResumeResponse.json();
    return rankedResumeIds;
  } catch (error) {
    console.error("Error ranking resumes:", error);
    throw error;
  }
};

module.exports = {
  rankResumes,
};
