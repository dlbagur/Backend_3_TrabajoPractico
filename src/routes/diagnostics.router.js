import { Router } from 'express';
import { logger } from '../utils/logger.js';

const router = Router();

router.get('/loggerTest', (req, res) => {
  const log = req.logger ?? logger;
  try {
    log.debug('DEBUG');
    log.http('HTTP');
    log.info('INFO');
    log.warning('WARNING');
    log.error('ERROR');
    log.fatal('FATAL');
    res.type('text').send('Logs emitidos, revisar la consola y errors.log en prod)');
  } catch (e) {
    log.error(`loggerTest failed: ${e.message}`);
    res.status(500).json({ status: 'error', error: e.message });
  }
});

export default router;