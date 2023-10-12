import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Language } from '../../../components/AskDoctor/types';
import { languageApi } from '../../service/languages/languageApi';

export const LANGUAGES_QUERY_KEY = ['languages'];

export const useLanguagesQuery = (
  options?: UseQueryOptions<Language[], unknown, Language[]>,
) => {
  const { getLanguages } = languageApi();

  return useQuery<Language[], unknown, Language[]>(
    LANGUAGES_QUERY_KEY,
    async (): Promise<Language[]> => await getLanguages(),
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      staleTime: 0,
      useErrorBoundary: true,
    },
  );
};
