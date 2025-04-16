const bcrypt = require('bcryptjs');
const db = require('../db/mysql');
const { generateToken } = require('../utils/jwt');

const registerUser = async ({ username, email, password }) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const [existing] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  if (existing.length) throw new Error('User already exists');

  await db.execute(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, hashedPassword]
  );

  return { message: 'User registered successfully' };
};

const loginUser = async ({ email, password }) => {
  const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  const user = users[0];
  
  if (!user) throw new Error('Invalid credentials');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error('Invalid credentials');

  const token = generateToken({ id: user.id, email: user.email,  });
  return { token };
};

module.exports = { registerUser, loginUser };
