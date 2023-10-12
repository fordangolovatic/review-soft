import api from './api';

const getProfileApi = () => {
  const profileApi = async () => api.get('/v1/account');

  return { profileApi };
};

export default getProfileApi;
