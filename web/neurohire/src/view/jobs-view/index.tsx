import React, { useEffect } from "react";
import { Grid, Container } from "@mui/material";
import JobCard from "./component/JobCard";
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

const Jobs: React.FC = () => {
  const { jobs, fetchJobsData, jobsLoading } = useJob();

  useEffect(() => {
    fetchJobsData();
    if (jobs) {
      console.log(jobs);
    }
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {jobsLoading ? (
          <Loader />
        ) : ( jobs && jobs.length === 0 ? (
          <Grid item xs={12}>
            <h2>No jobs available</h2>
          </Grid>
        ) : (
          jobs?.map((job: Job, index: number) => (
            <Grid item xs={12} sm={6} md={4} key={job.job_id || index}>
              <JobCard job={job} />
            </Grid>
          ))
        )
        )}
      </Grid>
    </Container>
  );
};

export default Jobs;
