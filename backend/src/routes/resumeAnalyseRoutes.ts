import { Router } from 'express';
import { upload } from '../middlewares/multerMiddleware';
import { tokenRateLimitMiddleware } from '../middlewares/tokenRateLimit';
import { analyzeResume } from '../controllers/resumeController';

const router = Router();

router.post('/analyze-resume',
  upload.single('resume'),
  tokenRateLimitMiddleware,
  analyzeResume
);

export default router;
