import express from 'express';
import * as jobController from '../controllers/jobController';

const router = express.Router();

router.post('/analyze', jobController.analyzeJobDescription);
router.post('/evaluate-answer', jobController.evaluateAnswer);
router.post('/match-resume', jobController.matchResumeToJob);

export default router;