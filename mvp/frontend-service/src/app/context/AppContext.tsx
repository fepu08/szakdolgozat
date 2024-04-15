import { ReactNode, createContext, useContext, useReducer } from 'react';
import {
  UserLoginFormModel,
  UserRegisterFormModel,
} from '../../models/UserModel';
import { MovieDTO } from '../../models/MovieModel';
import { Movies, Users } from '../api/agent';
import { clearStorage, handleError } from '../../utils';
import { ActionTypes, AppAction, AppState, appReducer } from './AppReducer';

type AppProviderProps = { children: ReactNode };

const userInfoFromStorage = localStorage.getItem('userInfo');
const recommendationsFromStorage = localStorage.getItem('recommendations');
const initialState: AppState = {
  user:
    userInfoFromStorage && userInfoFromStorage !== 'undefined'
      ? JSON.parse(userInfoFromStorage)
      : null,
  movies:
    recommendationsFromStorage && recommendationsFromStorage !== 'undefined'
      ? JSON.parse(recommendationsFromStorage)
      : null,
  error: null,
};

type AppContextState = {
  appState: AppState;
  dispatchState: React.Dispatch<AppAction>;
  getTopN: () => Promise<void>;
  register: (credentials: UserRegisterFormModel) => Promise<void>;
  login: (credentials: UserLoginFormModel) => Promise<void>;
  logout: () => Promise<void>;
};

const AppContext = createContext({} as AppContextState);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const getTopN = async () => {
    const savedRecommendation = localStorage.getItem('recommendations');
    try {
      let topN: MovieDTO[];
      if (savedRecommendation) {
        topN = JSON.parse(savedRecommendation);
      } else {
        topN = await Movies.getTopN();
        localStorage.setItem('recommendations', JSON.stringify(topN));
      }

      dispatch({
        type: ActionTypes.RECOMMENDATION,
        movies: topN,
      });
    } catch (err) {
      const error = handleError(err);
      dispatch({ type: ActionTypes.ERROR, error });
    }
  };

  const register = async (userInput: UserRegisterFormModel) => {
    try {
      const user = await Users.register(userInput);
      localStorage.setItem('userInfo', JSON.stringify(user));
      dispatch({
        type: ActionTypes.REGISTER,
        user,
      });
    } catch (err) {
      const error = handleError(err);
      dispatch({ type: ActionTypes.ERROR, error });
    }
  };

  const login = async (credentials: UserLoginFormModel) => {
    try {
      const user = await Users.login(credentials);
      localStorage.setItem('userInfo', JSON.stringify(user));
      dispatch({
        type: ActionTypes.LOGIN,
        user,
      });
    } catch (err) {
      const error = handleError(err);
      dispatch({ type: ActionTypes.ERROR, error });
    }
  };

  const logout = async () => {
    try {
      await Users.logout();
      clearStorage();
      dispatch({ type: ActionTypes.LOGOUT });
    } catch (err) {
      const error = handleError(err);
      dispatch({ type: ActionTypes.ERROR, error });
    }
  };

  return (
    <AppContext.Provider
      value={{
        appState: state,
        dispatchState: dispatch,
        getTopN,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('AppContext must be used within a userProvider');
  }
  return context;
};
