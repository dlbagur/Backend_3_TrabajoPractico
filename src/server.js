// src/server.js
import app from './app.js';
import { logger } from './utils/logger.js';

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  logger.info(`Servidor escuchando en http://localhost:${PORT}`);
  logger.info(`Swagger en http://localhost:${PORT}/api-docs`);
});
