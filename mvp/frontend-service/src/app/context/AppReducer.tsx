import { ErrorModel } from '../../models/ErrorModel';
import { MovieDTO } from '../../models/MovieModel';
import { UserDTO } from '../../models/UserModel';

export enum ActionTypes {
  REGISTER = 'REGISTER_SUCCESS',
  LOGIN = 'LOGIN_SUCCESS',
  LOGOUT = 'LOGOUT_SUCCESS',
  RECOMMENDATION = 'RECOMMENDATION',
  ERROR = 'ERROR',
}

export type AppAction =
  | {
      type: ActionTypes.REGISTER | ActionTypes.LOGIN;
      user: UserDTO;
    }
  | {
      type: ActionTypes.LOGOUT;
    }
  | { type: ActionTypes.RECOMMENDATION; movies: MovieDTO[] }
  | {
      type: ActionTypes.ERROR;
      error: ErrorModel;
    };

export type AppState = {
  user: UserDTO | null;
  movies: MovieDTO[] | null;
  error: ErrorModel | null;
};

export const appReducer = (state: AppState, action: AppAction) => {
  switch (action.type) {
    case ActionTypes.REGISTER:
    case ActionTypes.LOGIN:
      return {
        ...state,
        user: action.user,
        error: null,
      };
    case ActionTypes.LOGOUT:
      return {
        user: null,
        movies: null,
        error: null,
      };
    case ActionTypes.RECOMMENDATION:
      return {
        ...state,
        movies: action.movies,
        error: null,
      };
    case ActionTypes.ERROR:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
