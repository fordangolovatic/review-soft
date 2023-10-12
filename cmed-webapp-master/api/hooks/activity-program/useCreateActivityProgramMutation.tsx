import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { postActivityProgram } from '../../service/account/activity-program/createActivityProgram';
import { ActivityProgramItem } from '../../types/account/account';
import { ACTIVITY_PROGRAM_QUERY_KEY } from './useActivityProgramQuery';

export const useCreateActivityProgramMutation = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  const queryClient = useQueryClient();

  return useMutation(
    (updatedActivity: ActivityProgramItem[]) => postActivityProgram(updatedActivity),
    {
      ...options,
      onSuccess: () => {
        queryClient.invalidateQueries(ACTIVITY_PROGRAM_QUERY_KEY);
      },
    },
  );
};
