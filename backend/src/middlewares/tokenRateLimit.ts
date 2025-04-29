import { RequestHandler } from 'express';
import { TokenUsage } from '../models/TokenUsage';

const TOKEN_QUOTA_PER_IP = 5000; // lifetime quota

export const tokenRateLimitMiddleware: RequestHandler = async (req, res, next) => {
  const ip =
  (typeof req.headers['x-forwarded-for'] === 'string'
    ? req.headers['x-forwarded-for'].split(',')[0].trim()
    : req.ip) || 'unknown';
  
  let usage = await TokenUsage.findOne({ ip });
  if (!usage) {
    usage = new TokenUsage({ ip, used: 0 });
    await usage.save();
  }
  if (usage.used >= TOKEN_QUOTA_PER_IP) {
    res.status(429).json({
      error: 'Lifetime free token quota reached! Please support the project \u2615 to unlock more.',
      quota: TOKEN_QUOTA_PER_IP,
      used: usage.used
    });
    return;
  }
  (req as any).tokenUsageDoc = usage;
  next();
};
