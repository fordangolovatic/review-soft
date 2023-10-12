import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { useToast } from '../../../utilities/hooks/useToast';
import { addFavoriteDoctor } from '../../service/favorite-doctors';

export const useAddFavoriteDoctorMutation = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  const queryClient = useQueryClient();
  const { notifySuccess, notifyError } = useToast();

  return useMutation(
    (favoriteDoctorId: number) => addFavoriteDoctor(favoriteDoctorId),
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries(['favorite-doctors']);
        notifySuccess('The doctor was successfully added to the favorites.');
      },
      onError: () => {
        notifyError('Something went wrong. Please try again later.');
      },
    },
  );
};
