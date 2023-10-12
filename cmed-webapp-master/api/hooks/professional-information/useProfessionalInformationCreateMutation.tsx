import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { postProfessionalInfo } from '../../service/account/professional-info';
import { ProfessionalInfoCreate } from '../../types/account/account';
import { PROFESSIONAL_INFORMATION_QUERY_KEY } from './useProfessionalInformationQuery';

export const useProfessionalInformationCreateMutation = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (updatedUser: ProfessionalInfoCreate) => postProfessionalInfo(updatedUser),
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries(PROFESSIONAL_INFORMATION_QUERY_KEY);
      },
    },
  );
};
