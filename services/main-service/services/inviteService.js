// Copyright (c) 2025 Neuro Hire
//
// Licensed under the MIT License.
// See LICENSE file in the project root for full license information.

const db = require("../db/mysql");

const sendInvite = async (email, profileId, userName, role) => {
  const AUTH_SERVICE_URL =
    process.env.AUTH_SERVICE_URL || "http://localhost:3001";

  const response = await fetch(`${AUTH_SERVICE_URL}/api/invite`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      userName,
      role,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to send invite", response.statusText);
  }

  const data = await response.json();
  const query = `INSERT INTO user_accounts (email, profile_id) VALUES (?, ?)`;
  const [result] = await db.execute(query, [email, profileId]);
  if (result.affectedRows === 0) {
    throw new Error("Failed to insert invite into database");
  }
  return { insertId: result.insertId, ...data };
};

module.exports = {
  sendInvite,
};
