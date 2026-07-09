import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken, JwtPayload } from '../utils/jwtUtils';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
  // First, check cookies
  let token = req.cookies?.accessToken;

  // Fallback to Authorization header
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (token) {
    try {
      const decoded = verifyAccessToken(token);
      
      // DB lookup to ensure the account wasn't deactivated AFTER the JWT was issued
      const user = await import('../models/User').then(m => m.default.findById(decoded.userId).select('isActive'));
      if (!user || !user.isActive) {
        return res.status(403).json({ message: 'Account is deactivated' });
      }

      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized - No Token Provided' });
  }
};
