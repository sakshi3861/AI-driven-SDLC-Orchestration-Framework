const authService = require('../services/authService');

/**
 * Controller handler for POST /users/login
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string' || email.trim() === '' || password.trim() === '') {
      return res.status(400).json({
        success: false,
        error: 'Email and password are required.',
      });
    }

    const result = await authService.authenticateUser(email, password);

    if (!result.success) {
      return res.status(result.status || 401).json({
        success: false,
        error: result.error,
      });
    }

    return res.status(200).json({
      success: true,
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  login,
};
