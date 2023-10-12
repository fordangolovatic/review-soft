import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { readNotifications } from '../../service/notifications';
import { NOTIFICATIONS_QUERY_KEY } from './useNotificationsQuery';

export const useReadNotificationsMutation = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  const queryClient = useQueryClient();

  return useMutation(() => readNotifications(), {
    ...options,
    onSuccess: () => {
      queryClient.invalidateQueries(NOTIFICATIONS_QUERY_KEY);
    },
  });
};
