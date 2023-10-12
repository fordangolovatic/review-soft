import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GetLoginApi from '../api/getLoginApi';

const useLogin = () => {
  const navigate = useNavigate();

  const [logged, setLogged] = useState(false);

  const { loginApi } = GetLoginApi();

  const login = (loginForm) =>
    loginApi(loginForm)
      .then((response) => {
        const { accessToken } = response.data;
        const { refreshToken } = response.data;

        if (accessToken && refreshToken) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          navigate('/');
          setLogged(true);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });

  const logOut = () => {
    localStorage.clear();
    setLogged(false);
    navigate('/login');
  };

  const isLogged = () => logged;

  return {
    login,
    isLogged,
    logOut,
  };
};

export default useLogin;
