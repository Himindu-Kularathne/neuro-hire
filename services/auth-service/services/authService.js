const db = require("../db/mysql");
const bcrypt = require("bcryptjs");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");

const registerUser = async (body) => {
  const hashedPassword = await bcrypt.hash(body?.password, 10);

  const [existingUser] = await db.execute(
    "SELECT * FROM users WHERE email = ?",
    [body?.email]
  );
  if (existingUser.length) throw new Error("User already exists");

  const [result] = await db.execute(
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)",
    [body?.username, body?.email, hashedPassword, body?.role]
  );

  const userId = result.insertId;
  const payload = { id: userId, email: body?.email, role: body?.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);
  // Save refresh token in DB
  await db.execute(
    "INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)",
    [userId, refreshToken]
  );

  return { accessToken, refreshToken };
};

const loginUser = async ({ email, password }) => {
  const [users] = await db.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  const user = users[0];
  if (!user) throw new Error("Invalid credentials");

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw new Error("Invalid credentials");

  const payload = { id: user.id, email: user.email, role: user.role };
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  // Save refresh token in DB
  await db.execute(
    "INSERT INTO refresh_tokens (user_id, token) VALUES (?, ?)",
    [user.id, refreshToken]
  );

  return { accessToken, refreshToken };
};

const refreshTokenFlow = async (token) => {
  try {
    const payload = verifyRefreshToken(token);
    const [tokens] = await db.execute(
      "SELECT * FROM refresh_tokens WHERE token = ?",
      [token]
    );

    if (!tokens.length) throw new Error("Token not found");

    const newAccessToken = generateAccessToken({
      id: payload.id,
      email: payload.email,
      role: payload.role,
    });

    return { accessToken: newAccessToken };
  } catch (err) {
    throw new Error("Invalid refresh token");
  }
};

module.exports = {
  loginUser,
  refreshTokenFlow,
  registerUser,
};
