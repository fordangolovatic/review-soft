import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { readMessages } from '../../../../api/service/message/readMessages';

export const useReadMessagesMutation = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  return useMutation((convId: number) => readMessages(convId), {
    ...options,
  });
};
