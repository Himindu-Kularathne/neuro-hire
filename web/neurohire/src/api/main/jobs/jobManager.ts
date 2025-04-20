import { fetchApi } from "../../index";

export async function getJobs() {
  try {
    const jobsData = await fetchApi("http://localhost:3000/api/job/", "GET");
    console.log("Profile data:", jobsData);
    return jobsData;
  } catch (error) {
    console.error("Failed to fetch jobs data.");
    throw error; 
  }
}
