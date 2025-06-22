import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  Stack,
  useTheme,
} from "@mui/material";
import { useResume } from "../../../context/ResumeContext";
import Lottie from "lottie-react";
import noResultsAnimation from "../../../assets/annimations/processing.json";
import { motion } from "framer-motion";

const StepResult: React.FC = () => {
  const { finalResults } = useResume();
  const rankedResumes = finalResults?.ranked_resumes || [];

  if (rankedResumes.length === 0) {
    return (
      <Box textAlign="center" mt={4}>
        <Box width={{ xs: "90%", sm: "500px" }} mx="auto">
          <Lottie animationData={noResultsAnimation} loop={true} />
        </Box>
        <Typography variant="h6" mt={2}>
          Working on it! Please wait while we process the resumes.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
          🌟 Resume Ranking Results
        </Typography>
      </motion.div>

      <Stack spacing={3}>
        {rankedResumes.map((resume: any, index: number) => {
          const scorePercent = (resume.score * 100).toFixed(1);
          const fileName = resume.id;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                sx={{
                  p: 2,
                  borderRadius: 4,
                  background: "linear-gradient(145deg, #e0f7fa, #e3f2fd)",
                  boxShadow:
                    "0 4px 12px rgba(33, 150, 243, 0.2), 0 6px 20px rgba(0, 0, 0, 0.05)",
                  backdropFilter: "blur(8px)",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: "#1976d2",
                        width: 50,
                        height: 50,
                        fontSize: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {fileName[0]?.toUpperCase()}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        {fileName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Match Score: {scorePercent}%
                      </Typography>
                    </Box>
                  </Stack>

                  <Box mt={2}>
                    <LinearProgress
                      variant="determinate"
                      value={+scorePercent}
                      sx={{
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: "#bbdefb",
                        [`& .MuiLinearProgress-bar`]: {
                          background:
                            "linear-gradient(to right, #2196f3, #1e88e5)",
                        },
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </Stack>
    </Box>
  );
};

export default StepResult;
