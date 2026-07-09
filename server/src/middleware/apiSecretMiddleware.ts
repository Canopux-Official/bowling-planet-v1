import { Request, Response, NextFunction } from 'express';

const API_SECRET = process.env.API_SECRET;

export const apiSecretMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // If API_SECRET is not configured, we allow requests (useful for dev without env, but in prod it should be set)
  if (!API_SECRET) {
    console.warn('WARNING: API_SECRET is not configured in .env');
    return next();
  }

  const clientApiKey = req.headers['x-api-key'] || req.query['x-api-key'];

  if (!clientApiKey || clientApiKey !== API_SECRET) {
    console.log(clientApiKey, API_SECRET);
    res.status(403).json({ message: 'Forbidden: Invalid or missing API Secret' });
    return;
  }

  next();
};
