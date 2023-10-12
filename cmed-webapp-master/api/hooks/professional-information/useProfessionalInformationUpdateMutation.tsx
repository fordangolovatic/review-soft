import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { patchProfessionalInfo } from '../../service/account/professional-info';
import { ProfessionalInformation } from '../../types/account/account';
import { PROFESSIONAL_INFORMATION_QUERY_KEY } from './useProfessionalInformationQuery';

export const useProfessionalInformationUpdateMutation = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (updatedUser: ProfessionalInformation) => patchProfessionalInfo(updatedUser),
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries(PROFESSIONAL_INFORMATION_QUERY_KEY);
      },
    },
  );
};
