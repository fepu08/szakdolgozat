import { UserDTO } from './user-dto';
import { UserAttributes, UserModel } from './user-model';
import UnauthorizedError from '../../../errors/unauthorized-error';

export class UserDAO {
  public static async getUserById(id: number) {
    const user = await UserModel.findOne({
      where: {
        user_id: id,
      },
    });
    return user ? user.get() : null;
  }

  public static async loginUser(email: string, password: string) {
    console.log(`UserDAO.loginUser is called with ${email}`);
    const user = await UserModel.scope('withPassword').findOne({
      where: { email },
    });

    if (!user || !(await user.checkPassword(password))) {
      throw new UnauthorizedError('Invalid Email or Password');
    }

    return user.get();
  }

  public static async addUser(
    user: UserDTO,
  ): Promise<[UserAttributes, boolean]> {
    console.log(
      `UserDAO.addUser is called with ${JSON.stringify({ ...user, password: user.password ? 'provided' : 'not provided' })}`,
    );
    const [data, isNewRecord] = await UserModel.findOrCreate({
      where: { email: user.email },
      defaults: {
        name: user.name,
        email: user.email,
        password: user.password!,
      },
    });
    return [data.get(), isNewRecord];
  }
}
