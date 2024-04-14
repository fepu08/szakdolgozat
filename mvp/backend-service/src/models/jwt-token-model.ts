import { JwtPayload } from 'jsonwebtoken';

export type JwtAuthBody = {
  userId: number;
};

export type JwtAuthToken = JwtPayload & JwtAuthBody;
