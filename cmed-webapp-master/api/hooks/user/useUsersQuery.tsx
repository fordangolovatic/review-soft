import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchUsers } from '../../service/user';
import { User } from '../../types/user';

export const USERS_QUERY_KEY = ['users'];

export const useUsersQuery = (options?: UseQueryOptions<User[]>) => {
  return useQuery<User[]>(
    [USERS_QUERY_KEY],
    async (): Promise<User[]> => {
      return await fetchUsers().getAllUsers();
    },
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  );
};
