// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import { AppConfig } from "../../../config/config";
import { fetchApi } from "../../index";

export async function getJobs() {
  try {
    const jobsData = await fetchApi(`${AppConfig.serviceUrls.job}/`, "GET");
    return jobsData;
  } catch (error) {
    throw error;
  }
}

export async function createJob(jobData: any) {
  try {
    const response = await fetchApi(
      `${AppConfig.serviceUrls.job}/`,
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
      `${AppConfig.serviceUrls.job}/${jobId}`,
      "PUT",
      jobData,
    );
    return response;
  } catch (error) {
    throw error;
  }
}
