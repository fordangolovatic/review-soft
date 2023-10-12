import { QueryClient } from '@tanstack/react-query';

type TError = {
  response: {
    status: number;
  };
};

const queryConfig = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      retry: (failureCount, error) =>
        failureCount <= 5 && (error as TError).response?.status !== 403,
      useErrorBoundary: (error) => (error as TError).response?.status !== 403,
    },
    mutations: {
      useErrorBoundary: (error) => (error as TError).response?.status !== 403,
    },
  },
});

export default queryConfig;
