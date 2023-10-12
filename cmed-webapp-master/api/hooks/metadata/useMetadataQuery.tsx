import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useGlobalState } from '../../../utilities/global-state';
import { fetchMetadata } from '../../service/metadata';
export const METADATA_QUERY_KEY = ['metadata'];

export interface Metadata {
  accountType: string;
  profileImage: string;
  userId: number;
  firstName: string;
  lastName: string;
}

export const useMetadataQuery = (
  options?: UseQueryOptions<Metadata, unknown, Metadata>,
) => {
  const { isLoggedIn } = useGlobalState();

  return useQuery<Metadata, unknown, Metadata>(METADATA_QUERY_KEY, fetchMetadata, {
    ...options,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
    useErrorBoundary: true,
    enabled: isLoggedIn,
  });
};
