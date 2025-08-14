import winston from 'winston';

const customLevels = {
  levels: { fatal: 0, error: 1, warning: 2, info: 3, http: 4, debug: 5 },
  colors: { fatal: 'redBG', error: 'red', warning: 'yellow', info: 'green', http: 'cyan', debug: 'blue' }
};
winston.addColors(customLevels.colors);

const buildLogger = (env) => {
  if (env === 'production') {
    return winston.createLogger({
      levels: customLevels.levels,
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
      transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: 'errors.log', level: 'error' })
      ]
    });
  }
  return winston.createLogger({
    levels: customLevels.levels,
    format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    transports: [ new winston.transports.Console({ level: 'debug' }) ]
  });
};

export const logger = buildLogger(process.env.NODE_ENV || 'development');
