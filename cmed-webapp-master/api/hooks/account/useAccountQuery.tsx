import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchAccount } from '../../service/account/personal-info';
import { Account } from '../../types/account/account';

export const ACCOUNT_QUERY_KEY = ['account'];

export const useAccountQuery = (
  options?: UseQueryOptions<Account, unknown, Account>,
) => {
  return useQuery<Account, unknown, Account>(
    ACCOUNT_QUERY_KEY,
    async (): Promise<Account> => await fetchAccount().then((res) => res?.data),
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
      useErrorBoundary: true,
    },
  );
};
