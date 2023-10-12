const useToken = () => {
  const getToken = () => localStorage.getItem('accessToken');

  const getRefreshToken = () => localStorage.getItem('refreshToken');

  return { getToken, getRefreshToken };
};

export default useToken;
