const useLogged = () => {
  const isLogged = () => !!localStorage.getItem('accessToken');
  return { isLogged };
};

export default useLogged;
