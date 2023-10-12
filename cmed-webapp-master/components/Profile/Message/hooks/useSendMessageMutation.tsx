import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { requestMessage } from '../../../../api/service/message/requestMessage';
import { SendMessage } from '../../../../api/types/account/messages/messages';

export const useSendMessageMutation = (
  options?: UseMutationOptions<SendMessage, unknown, SendMessage>,
) => {
  return useMutation((message: SendMessage) => requestMessage(message), {
    ...options,
  });
};
