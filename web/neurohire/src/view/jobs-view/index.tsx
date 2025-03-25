import JobCard from "./component/JobCard";

interface Job {
    title: string;
    description: string;
    skills: string[];
    experience: string;
    education: string;
  }

export default function Jobs() {
    return (
        <div>
        <JobCard  job={{
            title: "Software Engineer",
            description: "We are looking for a software engineer to join our team.",
            skills: ["React", "Node", "TypeScript"],
            experience: "2+ years",
            education: "Bachelors in Computer Science"
          }}/>
        </div>
    )
}