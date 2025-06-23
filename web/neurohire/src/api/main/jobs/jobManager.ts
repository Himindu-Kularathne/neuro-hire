// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import { fetchApi } from "../../index";

export async function getJobs() {
  try {
    const jobsData = await fetchApi("http://localhost:3005/api/job/", "GET");
    return jobsData;
  } catch (error) {
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
    throw error;
  }
}

export async function updateJob(jobId: string, jobData: any) {
  try {
    const response = await fetchApi(
      `http://localhost:3005/api/job/${jobId}`,
      "PUT",
      jobData,
    );
    return response;
  } catch (error) {
    throw error;
  }
}
