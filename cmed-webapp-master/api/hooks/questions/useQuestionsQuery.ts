import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { Question } from '../../../components/AskDoctor/types';
import { useGlobalState } from '../../../utilities/global-state';
import { fetchQuestions } from '../../service/questions/fetchQuestions';
import { QUESTION_QUERY_KEY } from './useQuestionCreateMutation';

export const useQuestionsQuery = (
  options?: UseQueryOptions<Question[], unknown, Question[]>,
) => {
  const { getAllQuestions } = fetchQuestions();
  const { filters } = useGlobalState();

  const specialities = filters.specialities.map((speciality) => speciality.value);
  const languages = filters.languages.map((language) => language.value);

  return useQuery<Question[], unknown, Question[]>(
    [...QUESTION_QUERY_KEY, ...specialities, ...languages],
    async () => getAllQuestions({ specialities, languages }),
    {
      ...options,
      refetchIntervalInBackground: true,
      refetchOnWindowFocus: true,
      useErrorBoundary: true,
      staleTime: 0,
    },
  );
};
