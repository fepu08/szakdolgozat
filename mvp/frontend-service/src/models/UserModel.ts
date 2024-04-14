export type UserDTO = {
  id?: number;
  email: string;
  password?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
};

export interface UserLoginFormModel {
  email: string;
  password: string;
}

export interface UserRegisterFormModel extends UserLoginFormModel {
  name?: string;
}
