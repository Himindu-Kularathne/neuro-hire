import React, { useState, useEffect } from "react";
import { Grid, Container } from "@mui/material";
import JobCard from "./component/JobCard";
import { getJobs } from "../../api/main/jobs/jobManager";
import { useJob } from "../../context/JobContext";
import Loader from "../../component/LoadingComponent";

interface Job {
  job_id: string;
  job_name: string;
  description: string;
  skills_required: string[];
  experience: string;
  education_required: string;
}

export default function Jobs() {
  // const [jobData, setJobData] = React.useState<Job[]>(jobs);
  // const [loading, setLoading] = React.useState(false);

  // const handleJobClick = (job: Job) => {
  //   console.log("Job clicked:", job);
  // };

  const { jobs, setJobs, fetchJobsData, jobsLoading } = useJob();

  // // --- fetch job data ---
  // const fetchJobData = async () => {
  //   const jobData = await Loader();
  //   if (jobData) {
  //     setJobs(jobData);
  //     console.log("Job data fetched successfully:", jobData);
  //   } else {
  //     console.error("Failed to fetch job data");
  //   }
  // };

  useEffect(() => {
    fetchJobsData();
    console.log("Jobs data fetched successfully:", jobs);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {jobs
          ? jobs?.map((job: any, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <JobCard job={job} />
              </Grid>
            ))
          : jobsLoading && <Loader />}
      </Grid>
    </Container>
  );
}
