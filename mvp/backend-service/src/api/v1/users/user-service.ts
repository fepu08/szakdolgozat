import ServiceError from '../../../errors/service-error';
import { UserDAO } from './user-dao';
import { UserDTO } from './user-dto';
import MissingRequiredFieldError from '../../../errors/missing-field-error';
import { UserAttributes } from './user-model';
import {
  rethrowSequelizeConnectionRefusedError,
  validateNumberParam,
} from '../../../utils';

export class UserService {
  public static async getUserById(id: number) {
    console.log(`UserService.getUserById is called with ${id}`);
    try {
      const validatedId = validateNumberParam(id);
      const user = await UserDAO.getUserById(validatedId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (err) {
      if (err instanceof TypeError) {
        throw new ServiceError(`Provided user id is not a number: ${id}`);
      }
      throw err;
    }
  }

  public static async registerUser(user: UserDTO) {
    console.log(
      `UserService.registerUser is called with ${JSON.stringify({ ...user, password: user.password ? 'provided' : 'not provided' })}`,
    );
    if (!user.password) {
      throw new MissingRequiredFieldError('password');
    }

    try {
      return await UserDAO.addUser({ ...user });
    } catch (err) {
      rethrowSequelizeConnectionRefusedError(err);
      throw new ServiceError('Invalid user data', 400);
    }
  }

  public static async loginUser(user: UserDTO) {
    console.log(`UserService.loginUser is called with ${JSON.stringify(user)}`);
    const userEntity = await UserDAO.loginUser(user.email, user.password!);
    return this.filterOutPassword(userEntity);
  }

  private static filterOutPassword(user: UserAttributes): UserDTO {
    return {
      id: user.user_id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt?.toISOString(),
      updatedAt: user.updatedAt?.toISOString(),
    };
  }
}
