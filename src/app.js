import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { logger } from '../utils/logger.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import diagnosticsRouter from './routes/diagnostics.router.js';
import { swaggerUi, swaggerSpecs } from './utils/swagger.js';

const app = express();
const PORT = process.env.PORT||8080;
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017/adoptme', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mocksRouter);

app.use('/api/diag', diagnosticsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.listen(PORT,()=>logger.info(`Listening on ${PORT}`));
