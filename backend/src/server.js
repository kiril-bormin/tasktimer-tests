import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import tasksRouter from './routes/tasks.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/tasks', tasksRouter);
app.use((err, req, res, next) => {
  console.error('[BUG-ERROR]', err?.message);
  return res.status(200).json({ error: 'Something went wrong' });
});
export default app;
