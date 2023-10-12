import jwt from 'jwt-decode';
import { useCallback, useMemo } from 'react';
import { useSignOut } from '../../api/hooks/auth';

export const useCheckAccessExpiry = () => {
  const { onLogout } = useSignOut();

  const handleLogout = () => {
    window.location.replace('/');
    onLogout();
  };

  const currentTick = useMemo(() => (new Date().getTime() + 1) / 1000, []);

  const tokenHasExpired = useCallback(
    (decodedToken: any) => {
      return decodedToken?.exp < currentTick;
    },
    [currentTick],
  );

  if (typeof window !== 'undefined') {
    if (localStorage.getItem('accessToken')) {
      try {
        const decodedToken: any = jwt(localStorage.getItem('accessToken') ?? '');
        if (tokenHasExpired(decodedToken)) {
          handleLogout();
        }
      } catch (e) {
        handleLogout();
      }
    }
  }
};
