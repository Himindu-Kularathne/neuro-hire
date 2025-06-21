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
  const [filePreviews, setFilePreviews] = useState<
    { name: string; src: string | null }[]
  >([]);

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
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}
