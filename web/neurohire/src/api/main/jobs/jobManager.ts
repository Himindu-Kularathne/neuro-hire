import { fetchApi } from "../../index";

export async function getJobs() {
  try {
    const jobsData = await fetchApi("http://localhost:3005/api/job/", "GET");
    return jobsData;
  } catch (error) {
    console.error("Failed to fetch jobs data.");
    throw error;
  }
}

export async function createJob(jobData: any) {
  try {
    const response = await fetchApi(
      "http://localhost:3005/api/job/",
      "POST",
      jobData,
    );
    return response;
  } catch (error) {
    console.error("Failed to create job.");
    throw error;
  }
}

export async function updateJob(jobId: string, jobData: any) {
  console.log("Updating job with ID:", jobId);
  console.log("Job data:", jobData);
  try {
    const response = await fetchApi(
      `http://localhost:3005/api/job/${jobId}`,
      "PUT",
      jobData,
    );
    return response;
  } catch (error) {
    console.error("Failed to update job.");
    throw error;
  }
}
