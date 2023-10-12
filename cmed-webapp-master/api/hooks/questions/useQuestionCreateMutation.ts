import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { Question } from '../../../components/AskDoctor/types';
import { createQuestion } from '../../service/questions';

export const QUESTION_QUERY_KEY = ['question'];
export const useQuestionCreateMutation = (
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  return useMutation((question: Question) => createQuestion(question), {
    ...options,
  });
};
