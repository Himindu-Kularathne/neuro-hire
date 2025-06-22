/*
Copyright (c) 2025 Neuro Hire

Licensed under the MIT License.
See LICENSE file in the project root for full license information.
*/

const db = require("../db/mysql");

const attachProfileId = async (req, res, next) => {
  try {
    const email = req.user.email;

    console.log("Email from token:", email);

    const [rows] = await db.execute(
      "SELECT profile_id FROM user_accounts WHERE email = ?",
      [email]
    );

    if (!rows.length) {
      return res
        .status(404)
        .json({ message: "Profile not found for this user" });
    }

    req.profileId = rows[0].profile_id;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = attachProfileId;
