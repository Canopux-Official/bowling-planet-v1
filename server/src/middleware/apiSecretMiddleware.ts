import { Request, Response, NextFunction } from 'express';

const API_SECRET = process.env.API_SECRET;

export const apiSecretMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // SECURITY: Fail closed — if API_SECRET is not set in env, block ALL requests.
  // This prevents a misconfigured deployment from silently accepting unauthenticated traffic.
  if (!API_SECRET) {
    console.error('[Security] CRITICAL: API_SECRET env var is not set. Blocking all requests.');
    res.status(503).json({ message: 'Service temporarily unavailable.' });
    return;
  }

  const clientApiKey = req.headers['x-api-key'];

  if (!clientApiKey || clientApiKey !== API_SECRET) {
    // SECURITY: Never log the actual key value — only whether it was present.
    // SECURITY: Never hint at WHY the request was rejected.
    console.warn(`[Security] API key rejection. Key present: ${!!clientApiKey}. IP: ${req.ip}`);
    res.status(403).json({ message: 'Forbidden' });
    return;
  }

  next();
};
