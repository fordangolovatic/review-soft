import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { updateActivityProgram } from '../../service/account/activity-program';
import { ActivityProgramItem } from '../../types/account/account';
import { ACTIVITY_PROGRAM_QUERY_KEY } from './useActivityProgramQuery';

export const usePatchActivityProgramMutation = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (updatedActivity: ActivityProgramItem[]) =>
      updateActivityProgram(updatedActivity),
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries(ACTIVITY_PROGRAM_QUERY_KEY);
      },
    },
  );
};
