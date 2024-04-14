import { Request } from 'express';
import { UserAttributes } from '../api/v1/users/user-model';

export interface ExtendedRequest extends Request {
  user?: Omit<UserAttributes, 'password'>;
}
