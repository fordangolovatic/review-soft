import axios from 'axios';
// import useToken from '../hooks/useToken';

const instance = axios.create({
  baseURL: 'https://dev-api.clickmedicus.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const configuration = config;
    const token = localStorage.getItem('accessToken');
    if (token) {
      configuration.headers.Authorization = `Bearer ${token}`;
    }
    return configuration;
  },
  (error) => Promise.reject(error),
);

// instance.interceptors.response.use(
//     (res) => res,
//     async (err) => {
//         const { getRefreshToken } = useToken();
//
//         const originalConfig = err.config;
//
//         if (originalConfig.url !== '/login' && err.response) {
//             // Access Token was expired
//             if (err.response.status === 401) {
//                 // originalConfig._retry = true;
//
//                 try {
//                     const rs = await instance.post('/v1/auth/refresh', {
//                         refreshToken: getRefreshToken,
//                     });
//
//                     const { accessToken } = rs.data;
//                     localStorage.setItem('accessToken', accessToken)
//
//                     return instance(originalConfig);
//                 } catch (_error) {
//                     return Promise.reject(_error);
//                 }
//             }
//         }
//
//         return Promise.reject(err);
//     }
// );

export default instance;
