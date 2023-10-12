import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { getProfessionalInfo } from '../../service/account/professional-info';
import { ProfessionalInformation } from '../../types/account/account';

export const PROFESSIONAL_INFORMATION_QUERY_KEY = ['professional-info'];

// TODO - move this to its own query for professional-experience
export const PROFESSIONAL_EXPERIENCE_QUERY_KEY = ['professional-experience'];

export const useProfessionalInformationQuery = (
  options?: UseQueryOptions<
    ProfessionalInformation,
    unknown,
    ProfessionalInformation
  >,
) => {
  return useQuery<ProfessionalInformation, unknown, ProfessionalInformation>(
    PROFESSIONAL_INFORMATION_QUERY_KEY,
    async (): Promise<ProfessionalInformation> => await getProfessionalInfo(),
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
      useErrorBoundary: true,
    },
  );
};
