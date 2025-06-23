// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const token = req.body.refreshToken;
    if (!token)
      return res.status(400).json({ message: "Refresh token required" });

    const result = await authService.refreshTokenFlow(token);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, refresh };
