// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: `Access token required!` });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err)
      return res
        .status(403)
        .json({ message: `Invalid or expired token :  ${err}` });

    req.user = payload.user;
    next();
  });
};

module.exports = authenticateToken;
