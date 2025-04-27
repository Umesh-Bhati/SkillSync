import express from 'express';
import resumeRouter from './routes/resumeAnalyseRoutes';
import cors from 'cors';

const app = express();

app.use(cors()); // Enable CORS for all origins (development)
app.use(express.json());
app.use('/api/v1', resumeRouter);


import { Request, Response, NextFunction } from 'express';

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Global error:', JSON.stringify(err, null, 2));
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  });

export default app;
