import { Language } from '../../../components/AskDoctor/types';
import api from '../../config/api';

export const languageApi = () => {
  const getLanguages = async () => {
    const response: any = await api.get<{
      data: Language[];
    }>('language');
    return response.data;
  };

  return { getLanguages };
};
