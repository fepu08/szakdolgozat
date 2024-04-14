import { Response } from 'express';
import jwt from 'jsonwebtoken';
import MissingEnvVarError from '../errors/missing-env-var-error';

const cookieName = 'jwt';

export function setUpJwtCookie(userId: number, res: Response) {
  if (!process.env.JWT_SECRET) {
    throw new MissingEnvVarError('JWT_SECRET');
  }

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.NODE_ENV === 'production' ? '1h' : '30d',
  });

  res.cookie(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    // 1 hour in production, otherwise 10 days if not in production
    maxAge: process.env.NODE_ENV !== 'production' ? 864_000_000 : 3_600_000,
  });
}

export function removeJWTCookie(res: Response) {
  res.cookie(cookieName, '', {
    httpOnly: true,
    maxAge: 0,
  });
}
