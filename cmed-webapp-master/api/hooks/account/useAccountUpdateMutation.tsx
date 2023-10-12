import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { updateAccount } from '../../service/account/personal-info';
import { UpdateAccount } from '../../types/account/account';

export const useAccountUpdateMutation = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  return useMutation(
    (updatedAccount: UpdateAccount) => updateAccount(updatedAccount),
    {
      ...options,
    },
  );
};
