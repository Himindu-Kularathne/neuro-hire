require("dotenv").config();

const rankResumes = async (payload) => {
  console.log("I am here!");
  console.log("UR':", process.env.RESUME_RANKING_API_BASE_URL);
  if (!process.env.RESUME_RANKING_API_BASE_URL) {
    console.log("here 1");
    throw new Error("Resume ranking API base URL is not configured");
  }
  // try {
  console.log("One");
  const rankedResumeResponse = await fetch(
    `${process.env.RESUME_RANKING_API_BASE_URL}/rank`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  console.log("status: ", rankedResumeResponse);

  console.log("Status : ", rankedResumeResponse);

  if (!rankedResumeResponse.ok) {
    throw new Error("Resume ranking service failed");
  }
  const rankedResumeIds = await rankedResumeResponse.json();
  return rankedResumeIds;
  // } catch (error) {
  //   console.error("Error ranking resumes:", error);
  //   throw error;
  // }
};

module.exports = {
  rankResumes,
};
