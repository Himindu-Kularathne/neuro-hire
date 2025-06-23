// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

import React, { useContext, useState } from "react";
import { createJob, getJobs, updateJob } from "../api/main/jobs/jobManager";

const JobContext = React.createContext<any>(null);

export function useJob() {
  return useContext(JobContext);
}

export function JobProvider({ children }: any) {
  const [jobs, setJobs] = useState<any>(null);
  const [jobsLoading, setJobsLoading] = useState(false);

  const fetchJobsData = async () => {
    setJobsLoading(true);
    try {
      const jobsData = await getJobs();
      setJobs(jobsData);
    } catch (error) {
    } finally {
      setJobsLoading(false);
    }
  };

  const createNewJob = async (jobData: any) => {
    setJobsLoading(true);
    try {
      const response = await createJob(jobData);
      if (response) {
        setJobs((prevJobs: any) => [...prevJobs, response]);
      } else {
      }
    } catch (error) {
    } finally {
      setJobsLoading(false);
    }
  };

  const updateJobData = async (jobId: string, jobData: any) => {
    setJobsLoading(true);
    try {
      const response = await updateJob(jobId, jobData);
      if (response.job_id) {
        setJobs((prevJobs: any) =>
          prevJobs.map((j: any) => (j.job_id === jobId ? response : j)),
        );
      } else {
      }
    } catch (error) {
    } finally {
      setJobsLoading(false);
    }
  };

  return (
    <JobContext.Provider
      value={{
        jobs,
        setJobs,
        fetchJobsData,
        jobsLoading,
        createNewJob,
        updateJobData,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}
