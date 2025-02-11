const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errorResponse } = require('../utils/response');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

const securityMiddleware = [
  helmet(),
  limiter
];

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json(errorResponse('Internal Server Error'));
};

const notFoundHandler = (req, res) => {
  res.status(404).json(errorResponse('Resource not found'));
};

module.exports = {
  securityMiddleware,
  errorHandler,
  notFoundHandler
};