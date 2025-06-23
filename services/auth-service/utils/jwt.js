// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccessToken = (userPayload) => {
  return jwt.sign({ user: userPayload }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (userPayload) => {
  return jwt.sign({ user: userPayload }, process.env.REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

const verifyAccessToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
const verifyRefreshToken = (token) =>
  jwt.verify(token, process.env.REFRESH_SECRET);

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
