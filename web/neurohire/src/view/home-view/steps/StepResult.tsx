/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/

import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  Avatar,
  Stack,
  Button,
} from "@mui/material";
import { useResume } from "../../../context/ResumeContext";
import Lottie from "lottie-react";
import noResultsAnimation from "../../../assets/annimations/processing.json";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

const StepResult: React.FC = () => {
  const { finalResults } = useResume();
  const rankedResumes = finalResults?.ranked_resumes || [];
  console.log("Resumes: ", finalResults);
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
      <Stack spacing={3} maxWidth={600} margin="0 auto">
        {rankedResumes.map((resume: any, index: number) => {
          console.log("Here", finalResults);
          const [showReason, setShowReason] = useState(false);
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
                elevation={4}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  backgroundColor: "#fafafa",
                  cursor: "default",
                  userSelect: "text",
                  boxShadow:
                    "0 2px 6px rgba(33, 150, 243, 0.15), 0 8px 24px rgba(0, 0, 0, 0.04)",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.02)" },

                  maxWidth: 600,
                  width: "100%",
                  margin: "0 auto",
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
                    <Box flexGrow={1}>
                      <Typography variant="h6" fontWeight="bold" noWrap>
                        {fileName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Match Score: {scorePercent}%
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setShowReason(!showReason)}
                    >
                      {showReason ? "Hide Reason" : "View Reason"}
                    </Button>
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

                  {showReason && (
                    <Box
                      mt={3}
                      sx={{
                        backgroundColor: "#f9f9f9",
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: "inset 0 0 8px rgba(0,0,0,0.05)",
                        fontSize: 14,
                        lineHeight: 1.5,
                        maxHeight: 300,
                        overflowY: "auto",
                        whiteSpace: "pre-wrap",
                        width: "100%",
                        boxSizing: "border-box",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Why this match?
                      </Typography>
                      <ReactMarkdown
                        components={{
                          p: ({ node, ...props }) => (
                            <Typography
                              variant="body2"
                              sx={{ mb: 0.5 }}
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <li style={{ marginBottom: 2 }} {...props} />
                          ),
                        }}
                      >
                        {resume.reason}
                      </ReactMarkdown>
                    </Box>
                  )}
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
