import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  UserDTO,
  UserLoginFormModel,
  UserRegisterFormModel,
} from '../../models/UserModel';
import { MovieDTO } from '../../models/MovieModel';

const agent = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_HOST}:${
    import.meta.env.VITE_BACKEND_PORT
  }/api/v1`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const timeout = 1500;
agent.interceptors.response.use(
  async (response) => {
    if (import.meta.env.MODE === 'development')
      await new Promise((resolve) => {
        setTimeout(resolve, timeout);
      });
    return response;
  },
  (error: AxiosError) => {
    return error;
  },
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => agent.get<T>(url).then(responseBody),
  post: <T>(url: string, body: object) =>
    agent.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: object) =>
    agent.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => agent.delete<T>(url).then(responseBody),
};

export const Users = {
  register: (user: UserRegisterFormModel) =>
    requests.post<UserDTO>(`/users`, user),
  login: (credentials: UserLoginFormModel) =>
    requests.post<UserDTO>(`/users/login`, credentials),
  logout: () => requests.post(`/users/logout`, {}),
};

export const Movies = {
  getTopN: () => requests.get<MovieDTO[]>(`/recommendations`),
};
