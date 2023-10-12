import { useEffect } from 'react';
import { useGlobalState } from '../../../utilities/global-state';

export const useAutoRedirect = () => {
  const { setIsLoggedIn } = useGlobalState();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);
};
