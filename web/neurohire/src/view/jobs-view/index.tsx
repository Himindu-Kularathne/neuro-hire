import { Grid, Container } from "@mui/material";
import JobCard from "./component/JobCard";

interface Job {
  title: string;
  description: string;
  skills: string[];
  experience: string;
  education: string;
}

const jobs: Job[] = [
  {
    title: "Software Engineer",
    description: "We are looking for a software engineer to join our team.",
    skills: ["React", "Node", "TypeScript"],
    experience: "2+ years",
    education: "Bachelors in Computer Science",
  },
  {
    title: "Data Scientist",
    description: "We are looking for a data scientist to join our team.",
    skills: ["Python", "Machine Learning", "Statistics"],
    experience: "3+ years",
    education: "Masters in Data Science",
  },
  {
    title: "Product Manager",
    description: "We are looking for a product manager to join our team.",
    skills: ["Agile", "Scrum", "Product Management", "Stakeholder Management","Agile", "Scrum", "Product Management", "Stakeholder Management",],
    experience: "5+ years",
    education: "Masters in Business Administration",
  },
  {
    title: "UX Designer",
    description: "We are looking for a UX designer to join our team.",
    skills: ["Figma", "Sketch", "User Research"],
    experience: "3+ years",
    education: "Bachelors in Design",
  }
];

export default function Jobs() {

  // const [jobData, setJobData] = React.useState<Job[]>(jobs);
  // const [loading, setLoading] = React.useState(false);

  // const handleJobClick = (job: Job) => {
  //   console.log("Job clicked:", job);
  // };


  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {jobs.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <JobCard job={job} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
