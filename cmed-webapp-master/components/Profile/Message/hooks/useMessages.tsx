import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchMessages } from '../../../../api/service/message/fetchMessages';
import { SummaryMessage } from '../../../../api/types/account/messages/messages';

export const MESSAGES_QUERY_KEY = ['messages'];

export const useMessages = (
  options?: UseQueryOptions<SummaryMessage[], unknown, SummaryMessage[]>,
) => {
  const queryFn = async (): Promise<SummaryMessage[]> => {
    return await fetchMessages();
  };
  return useQuery<SummaryMessage[], unknown, SummaryMessage[]>(
    MESSAGES_QUERY_KEY,
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
