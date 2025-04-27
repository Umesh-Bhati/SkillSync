import { Request, Response, Router, RequestHandler } from 'express';
import { upload } from '../middlewares/multerMiddleware';
import { parseResumeText } from '../services/resumeParserService';
import { analyzeResumeAndJDWithGroq } from '../services/groqService';

const router = Router();

const TOKEN_QUOTA_PER_IP = 10000; // daily quota
const tokenUsageByIP: Record<string, { used: number, lastReset: number }> = {};
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const tokenRateLimitMiddleware: RequestHandler = (req, res, next) => {
  const ip = req.ip || 'unknown';
  const now = Date.now();
  if (!tokenUsageByIP[ip] || now - tokenUsageByIP[ip].lastReset > ONE_DAY_MS) {
    tokenUsageByIP[ip] = { used: 0, lastReset: now };
  }
  if (tokenUsageByIP[ip].used >= TOKEN_QUOTA_PER_IP) {
    res.status(429).json({
      error: 'Free token quota reached! Please support the project ☕ to unlock more.',
      quota: TOKEN_QUOTA_PER_IP,
      used: tokenUsageByIP[ip].used
    });
    return;
  }
  next();
};

router.post('/analyze-resume', tokenRateLimitMiddleware, upload.single('resume'), async (req: Request, res: Response) => {
  try {

    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const jobDescription = req.body.jobDescription;
    if (!jobDescription) {
      res.status(400).json({ error: 'Job description is required' });
      return;
    }
    const resumeText = await parseResumeText(req.file.path);

    const result = await analyzeResumeAndJDWithGroq(resumeText, jobDescription);

    const ip = req.ip || 'unknown';
    let tokensUsed = 0;
    if (result && result.usage && typeof result.usage.total_tokens === 'number') {
      tokensUsed = result.usage.total_tokens;
    } else {
      tokensUsed = Math.ceil((resumeText.length + jobDescription.length) / 4);
    }
    tokenUsageByIP[ip].used += tokensUsed;

    res.json({
      resumeUrl: req.file.path,
      ...result,
      tokenQuota: TOKEN_QUOTA_PER_IP,
      tokensUsed: tokenUsageByIP[ip].used,
      tokensThisRequest: tokensUsed,
    });
    return;
  } catch (error) {
    console.error('Error in /analyze-resume:', error);
    res.status(500).json({ error: 'Internal server error', details: error instanceof Error ? error.message : error });
  }
});

export default router;
