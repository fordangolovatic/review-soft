import { AxiosError } from 'axios';
import api from '../../../config/api';

export const getProfessionalInfo = async () => {
  return await api
    .get('users/professional-info')
    .then((res) => res.data)
    .catch((error) => {
      return error.response.data as AxiosError;
    });
};
