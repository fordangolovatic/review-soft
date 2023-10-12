import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { deleteMessage } from '../../../../api/service/message/deleteMessage';

export const useDeleteMessageMutation = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  return useMutation((messageId: number) => deleteMessage(messageId), {
    ...options,
  });
};
