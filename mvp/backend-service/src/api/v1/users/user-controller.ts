import { Request, Response, NextFunction, response } from 'express';
import asyncHandler from '../../../middlewares/async-handler-middleware';
import { UserService } from './user-service';
import { removeJWTCookie, setUpJwtCookie } from '../../../utils';
import { UserDTO } from './user-dto';
import UnauthorizedError from '../../../errors/unauthorized-error';

export default class UserController {
  /**
   * @desc Register user
   * @route POST /api/v1/users
   * @access public
   */
  public static registerUser = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log(
        `UserController.registerUser called with ${JSON.stringify({ ...req.body, password: (req.body as UserDTO).password ? 'provided' : 'not provided' })}`,
      );
      const { name, email, password } = validateRequestBody(req.body);

      const [user, isNewRecord] = await UserService.registerUser({
        name,
        email,
        password,
      });
      if (!isNewRecord) {
        res.status(409);
        throw new Error('User already exists');
      }

      setUpJwtCookie(user.user_id, res);

      res.status(200).json({
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    },
  );

  /**
   * @desc Login user
   * @route POST /api/v1/users/login
   * @access public
   */
  public static loginUser = asyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      console.log(
        `UserController.loginUser called with ${JSON.stringify(req.body)}`,
      );
      const userDTO = validateRequestBody(req.body);
      const user = await UserService.loginUser(userDTO);

      if (user && user.id) {
        setUpJwtCookie(user.id, res);
        res.status(200).json(user);
        return;
      }

      throw new UnauthorizedError();
    },
  );

  /**
   * @desc Logout user
   * @route POST /api/v1/users/logout
   * @access public
   */
  public static logoutUser = (
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    console.log(`UserController.logoutUser called`);
    removeJWTCookie(res);
    res.status(200).json({ message: 'Logged out successfully' });
  };
}

function validateRequestBody(body: unknown) {
  const user: UserDTO = body as UserDTO;

  if (!user.email || !user.password) {
    throw new Error('Invalid request body');
  }

  return user;
}
