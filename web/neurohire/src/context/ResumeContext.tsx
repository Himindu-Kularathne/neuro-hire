import { useContext, useState, createContext } from "react";
import { IResume } from "../types/ResumeTypes";

const ResumeContext = createContext<any>(null);

export function useResume() {
  return useContext(ResumeContext);
}

export function ResumeProvider({ children }: any) {
  const [resumes, setResumes] = useState<IResume[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [finalResults, setFinalResults] = useState<any>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [filePreviews, setFilePreviews] = useState<
    { name: string; src: string | null }[]
  >([]);
  const [numCVs, setNumCVs] = useState<number>(1);

  function getTopicByActiveStep(step: number) {
    switch (step) {
      case 0:
        return "Upload Resumes";
      case 1:
        return "Select Job";
      case 2:
        return "Preview";
      case 3:
        return "Results";
      default:
        return "";
    }
  }

  return (
    <ResumeContext.Provider
      value={{
        resumes,
        setResumes,
        selectedJob,
        setSelectedJob,
        filePreviews,
        setFilePreviews,
        finalResults,
        setFinalResults,
        activeStep,
        setActiveStep,
        getTopicByActiveStep,
        numCVs,
        setNumCVs,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}
