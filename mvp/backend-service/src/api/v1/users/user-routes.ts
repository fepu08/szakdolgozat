import express from 'express';
import UserController from './user-controller';

const userRouter = express.Router();

userRouter.route('/').post(UserController.registerUser);
userRouter.post('/login', UserController.loginUser);
userRouter.post('/logout', UserController.logoutUser);

export default userRouter;
