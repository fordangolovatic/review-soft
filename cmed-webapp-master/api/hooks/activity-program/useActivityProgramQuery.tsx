import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getActivityProgram } from '../../service/account/activity-program/fetchActivityProgram';
import { ActivityProgramItem } from '../../types/account/account';

export const ACTIVITY_PROGRAM_QUERY_KEY = ['activity-program'];

export const useActivityProgramQuery = (
  options?: UseQueryOptions<ActivityProgramItem[], unknown, ActivityProgramItem[]>,
) => {
  return useQuery<ActivityProgramItem[], unknown, ActivityProgramItem[]>(
    ACTIVITY_PROGRAM_QUERY_KEY,
    async (): Promise<ActivityProgramItem[]> => await getActivityProgram(),
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
      useErrorBoundary: true,
    },
  );
};
