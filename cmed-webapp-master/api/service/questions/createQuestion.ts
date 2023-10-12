import { Question } from '../../../components/AskDoctor/types';
import api from '../../config/api';

export const createQuestion = async (question: Question) => {
  return await api.post('questions', question).then((res) => res.data);
};
