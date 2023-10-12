import { AxiosResponse } from 'axios/index';
import { Speciality } from '../../../components/AskDoctor/types';
import api from '../../config/api';

export const specialitiesApi = () => {
  const getSpecialities = async () => {
    const response: AxiosResponse<Speciality[]> = await api.get('specialities');
    return response.data;
  };

  return { getSpecialities };
};
