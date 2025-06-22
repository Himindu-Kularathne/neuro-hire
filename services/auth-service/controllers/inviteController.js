const inviteService = require("../services/inviteService");

const sendInvite = async (req, res, next) => {
  try {
    console.log("Auth Service: Sending invite", req.body);
    const { userName, email, role } = req.body;
    console.log("Auth Service: User Name:", userName);
    if (!email || !userName || !role) {
      return res.status(400).json({
        message: "Auth Service: Email, User Name, and Role are required",
      });
    }

    const result = await inviteService.sendInvite(req, res);
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
