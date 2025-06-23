// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler");
const profileRoutes = require("./routes/profileRoutes");
const jobRouts = require("./routes/jobRouts");
const inviteRoutes = require("./routes/inviteRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const { log } = require("./utils/logger");
const { PORT, LIMIT } = require("./constants");

const app = express();

app.use(bodyParser.json({ limit: LIMIT }));
app.use(bodyParser.urlencoded({ limit: LIMIT, extended: true }));

//--- health check ---
app.get("/", (req, res) => {
  res.status(200).json({ message: "Upstream service is healthy" });
});

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/job", jobRouts);
app.use("/api/invite", inviteRoutes);
app.use("/api/resumes", resumeRoutes);

// Error Handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  log(`Server is running on http://localhost:${PORT}`);
});
