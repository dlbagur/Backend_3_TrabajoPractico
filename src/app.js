// src/app.js
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import { logger } from './utils/logger.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import diagnosticsRouter from './routes/diagnostics.router.js';
import { swaggerUi, swaggerSpecs } from './utils/swagger.js';

const app = express();

// Config Mongo
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/adoptme';
const mongooseOpts = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set('strictQuery', false);

// 👉 En dev/prod conecta acá. En test NO (los tests llaman connectDB()).
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(MONGO_URL, mongooseOpts)
    .then(() => logger.info('Conectado a MongoDB'))
    .catch(err => logger.error(`Error de conexión a MongoDB: ${err.message}`));
}

// Helper para tests: conectar a una URL específica
export const connectDB = (url) => mongoose.connect(url, mongooseOpts);

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Routers
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);
app.use('/api/diag', diagnosticsRouter);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.get('/api-docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecs);
});

export default app;
