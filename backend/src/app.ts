import express, { Request, Response } from 'express';
import resumeRouter from './routes/resumeAnalyseRoutes';
import cors from 'cors';

const app = express();

app.use(cors()); 
app.use(express.json());
app.use('/api/v1', resumeRouter);


app.use((err: any, req: Request, res: Response) => {
    console.error('Global error:', JSON.stringify(err, null, 2));
    res.status(500).json({ error: 'Something went wrong', details: err.message });
  });

export default app;
