const useToken = () => {
  const setAccessToken = (accessToken: string) =>
    localStorage.setItem('accessToken', accessToken);
  const setRefreshToken = (refreshToken: string) =>
    localStorage.setItem('refreshToken', refreshToken);
  const getToken = () => localStorage.getItem('accessToken');

  const getRefreshToken = () => localStorage.getItem('refreshToken');

  const removeTokens = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };
  return {
    getToken,
    getRefreshToken,
    setAccessToken,
    setRefreshToken,
    removeTokens,
  };
};

export default useToken;
