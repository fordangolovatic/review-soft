import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { fetchNotifications } from '../../service/notifications';
import { Notification } from '../../types/notifications';

export const NOTIFICATIONS_QUERY_KEY = ['notifications'];

export const useNotificationsQuery = (options?: UseQueryOptions<Notification[]>) => {
  return useQuery<Notification[]>(
    NOTIFICATIONS_QUERY_KEY,
    async (): Promise<Notification[]> => {
      return await fetchNotifications();
    },
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
    },
  );
};
