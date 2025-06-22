const express = require("express");
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler");
const profileRoutes = require("./routes/profileRoutes");
const jobRouts = require("./routes/jobRouts");
const inviteRoutes = require("./routes/inviteRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const cors = require("cors");
const { log } = require("./utils/logger");

const app = express();
app.use(cors({ origin: "*" }));
const port = 3005;

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

//--- health check ---
app.get("/", (req, res) => {
  res.status(200).json({ message: "upstream service is healthy" });
});

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/job", jobRouts);
app.use("/api/invite", inviteRoutes);
app.use("/api/resumes", resumeRoutes);

// Error Handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
  log(`Server is running on http://localhost:${port}`);
});
