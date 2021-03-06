import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { Request, Response, NextFunction } from 'express';

interface ReqInterface extends Request {
  userId?: string;
  headers: {
    authorization?: string;
  };
}

export default async (req: ReqInterface, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded: any = await promisify(jwt.verify)(
      token,
      `${process.env.SECRET}`
    );
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};
