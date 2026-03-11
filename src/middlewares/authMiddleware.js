const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const { getDb } = require('../config/database');

exports.protect = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }

  // 2) Verification token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');

    // 3) Check if user still exists
    const db = await getDb();
    const currentUser = await db.get('SELECT * FROM usuarios WHERE usuarioId = ?', decoded.id);
    
    if (!currentUser) {
      return next(
        new AppError(
          'The user belonging to this token does no longer exist.',
          401
        )
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    return next(new AppError('Invalid token', 401));
  }
};
