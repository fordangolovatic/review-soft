import { useGlobalState } from '../../../utilities/global-state';

export const useSignOut = () => {
  const { setIsLoggedIn } = useGlobalState();

  const onSignOut = (): void => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setIsLoggedIn(false);
  };

  return {
    onLogout: onSignOut,
  };
};
