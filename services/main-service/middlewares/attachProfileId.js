// middlewares/attachProfileId.js
const db = require("../db/mysql");

const attachProfileId = async (req, res, next) => {
  try {
    const email = req.user.email;

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
