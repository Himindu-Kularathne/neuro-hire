/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/

import React, { useEffect } from "react";
import { Grid, Container } from "@mui/material";
import JobCard from "./component/JobCard";
import { useJob } from "../../context/JobContext";
import Loader from "../../component/LoadingComponent";
import Lottie from "lottie-react";
import noJobsAnimation from "../../assets/annimations/empty.json";
interface Job {
  job_id: string;
  job_name: string;
  description: string;
  skills_required: string[];
  experience: string;
  education_required: string;
}

const Jobs: React.FC = () => {
  const { jobs, fetchJobsData, jobsLoading } = useJob();

  useEffect(() => {
    fetchJobsData();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {jobsLoading ? (
          <Loader />
        ) : jobs && jobs.length === 0 ? (
          <Grid item xs={12} sx={{ textAlign: "center", mt: 5 }}>
            <Lottie
              animationData={noJobsAnimation}
              loop
              style={{ width: 450, margin: "0 auto" }}
            />
          </Grid>
        ) : (
          jobs?.map((job: Job, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={job.job_id || index}>
              <JobCard job={job} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default Jobs;
