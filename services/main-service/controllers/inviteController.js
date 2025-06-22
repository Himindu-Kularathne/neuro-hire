const inviteService = require("../services/inviteService");

const sendInvite = async (req, res, next) => {
  try {
    const profileId = req.profileId;
    const { userName, email, role } = req.body;
    if (!email || !profileId || !role || !userName) {
      return res.status(400).json({
        message: "Email, Profile ID, Role, and User Name are required",
      });
    }

    const result = await inviteService.sendInvite(
      email,
      profileId,
      userName,
      role
    );
    res.status(200).json({
      message: "Invite sent successfully",
      inviteId: result.insertId,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  sendInvite,
};
