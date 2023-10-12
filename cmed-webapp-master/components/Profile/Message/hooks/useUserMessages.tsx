import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchUserMessages } from '../../../../api/service/message/fetchUserMessages';
import { Message } from '../../../../api/types/account/messages/messages';

export const USER_MESSAGES_QUERY_KEY = ['user-messages'];

export const useUserMessages = (
  userId: number,
  options?: UseQueryOptions<Message[], unknown, Message[]>,
) => {
  const queryFn = async (): Promise<Message[]> => {
    return await fetchUserMessages(userId);
  };
  return useQuery<Message[], unknown, Message[]>(
    [...USER_MESSAGES_QUERY_KEY, userId],
    queryFn,
    {
      ...options,
      retry: 0,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  );
};
