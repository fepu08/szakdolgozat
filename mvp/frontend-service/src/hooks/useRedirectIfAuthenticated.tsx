import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../app/context/AppContext';

/**
 * A custom hook to handle the common logic of redirect to home page if userState.user exists in userProvider.
 */
const useRedirectIfAuthenticated = () => {
  const navigate = useNavigate();
  const { appState } = useAppContext();

  useEffect(() => {
    if (appState.user) {
      navigate('/');
    }
  }, [appState.user, navigate]);
};

export default useRedirectIfAuthenticated;
