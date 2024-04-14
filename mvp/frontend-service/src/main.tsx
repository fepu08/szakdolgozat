import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './assets/styles/bootstrap.min.css';
import './assets/styles/index.css';
import './assets/styles/movie-carousel.css';
import 'react-multi-carousel/lib/styles.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.tsx';
import RegisterScreen from './screens/Auth/RegisterScreen.tsx';
import LoginScreen from './screens/Auth/LoginScreen.tsx';
import { AppProvider } from './app/context/AppContext.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/login' element={<LoginScreen />} />
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);
