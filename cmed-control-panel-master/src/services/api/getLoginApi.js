import api from './api';

const GetLoginApi = () => {
  const loginApi = async (loginForm) => api.post('v1/auth/login', loginForm);

  return {
    loginApi,
  };
};

export default GetLoginApi;
