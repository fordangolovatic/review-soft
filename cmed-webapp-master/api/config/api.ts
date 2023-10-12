import axios from 'axios';

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const apiPlatform = window.sessionStorage.getItem('platform');

    if (apiPlatform === 'prod') {
      return 'https://api.clickmedicus.com/api/v1/';
    }

    if (apiPlatform === 'local') {
      return 'http://localhost:3001/api/v1/';
    }
  }

  return 'https://dev-api.clickmedicus.com/api/v1/';
  return 'http://localhost:3001/api/v1/';
};

const instance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const configuration = config;
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('accessToken');
    if (token) {
      configuration.headers.Authorization = `Bearer ${token}`;
    }
  }

  return configuration;
});

export default instance;
