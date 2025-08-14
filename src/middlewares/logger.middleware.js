import { logger } from '../utils/logger.js';

export const addLogger = (req, _res, next) => {
  req.logger = logger;
  req.logger.http(`${req.method} ${req.originalUrl}`);
  next();
};
