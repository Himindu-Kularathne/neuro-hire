// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

const express = require("express");
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const inviteRoutes = require("./routes/inviteRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/invite", inviteRoutes);

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth server running on port ${PORT}`));
