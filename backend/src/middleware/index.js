// Generic Middlewares

const requestLogger = (req, res, next) => {
  // Simple request log fallback if morgan is not used
  next();
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.stack);
  res.status(statusCode).json({
    status: 'error',
    statusCode,
    message: err.message || 'Internal Server Error',
  });
};

const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Route ${req.originalUrl} not found`,
  });
};

module.exports = {
  requestLogger,
  errorHandler,
  notFoundHandler,
};
