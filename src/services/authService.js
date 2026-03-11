const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDb } = require('../config/database');
const AppError = require('../utils/AppError');

const signToken = (id, login) => {
  return jwt.sign({ id, login }, process.env.JWT_SECRET || 'secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '90d'
  });
};

exports.login = async (login, password) => {
  const db = await getDb();
  
  // 1) Check if email and password exist
  if (!login || !password) {
    throw new AppError('Please provide login and password!', 400);
  }

  // 2) Check if user exists && password is correct
  const user = await db.get('SELECT * FROM usuarios WHERE login = ?', login);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError('Incorrect login or password', 401);
  }

  // 3) If everything ok, send token to client
  const token = signToken(user.usuarioId, user.login);

  // Remove password from output
  user.password = undefined;

  return { token, user };
};
