const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

/**
 * Finds a user record in PostgreSQL by email address.
 * @param {string} email - User's email address.
 * @returns {Promise<Object|null>} User database row or null if not found.
 */
async function findUserByEmail(email) {
  const queryText = 'SELECT id, email, password_hash, role FROM users WHERE email = $1';
  const { rows } = await db.query(queryText, [email.toLowerCase().trim()]);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Authenticates user credentials and returns JWT token on success.
 * @param {string} email - User email
 * @param {string} password - User plain-text password
 * @returns {Promise<Object>} Result object with success status, token, user, or error message.
 */
async function authenticateUser(email, password) {
  if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
    return {
      success: false,
      status: 400,
      error: 'Email and password are required.',
    };
  }

  const normalizedEmail = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    return {
      success: false,
      status: 400,
      error: 'Email and password are required.',
    };
  }

  const user = await findUserByEmail(normalizedEmail);
  if (!user) {
    return {
      success: false,
      status: 401,
      error: 'Invalid email or password.',
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);
  if (!isPasswordValid) {
    return {
      success: false,
      status: 401,
      error: 'Invalid email or password.',
    };
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const secret = process.env.JWT_SECRET || 'fallback_default_jwt_secret';
  const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

  const token = jwt.sign(payload, secret, { expiresIn });

  return {
    success: true,
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  };
}

module.exports = {
  findUserByEmail,
  authenticateUser,
};
