// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: "Access denied: Insufficient permissions" });
    }

    next();
  };
};

module.exports = authorizeRoles;
