const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const AppError = require('./utils/AppError');
const globalErrorHandler = require('./middlewares/errorHandler');
const authRouter = require('./routes/authRoutes');
const inventoryRouter = require('./routes/inventoryRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Implement CORS
app.use(cors());

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// 2) ROUTES
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/inventario', inventoryRouter);

// 3) HANDLE UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 4) GLOBAL ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
