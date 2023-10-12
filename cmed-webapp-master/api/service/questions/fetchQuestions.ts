import { AxiosError } from 'axios';
import { Question } from '../../../components/AskDoctor/types';
import api from '../../config/api';
import { ApiFilters } from '../doctors/doctorsApi';

interface FetchQuestionsApiReturn {
  getAllQuestions: (filters?: ApiFilters) => Promise<Question[]>;
}

export const fetchQuestions = (): FetchQuestionsApiReturn => {
  const getAllQuestions = async (filters?: ApiFilters): Promise<Question[]> => {
    return await api
      .get('questions', {
        params: {
          ...filters,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        return error.response.data as AxiosError;
      });
  };

  return { getAllQuestions };
};
