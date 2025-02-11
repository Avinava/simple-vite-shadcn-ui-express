import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errorResponse } from '../utils/response.js';

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

export {
  securityMiddleware,
  errorHandler,
  notFoundHandler
};