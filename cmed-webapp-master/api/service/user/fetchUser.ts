import { AxiosError } from 'axios';
import api from '../../config/api';
import { User } from '../../types/user';

interface FetchQuestionsApiReturn {
  getAllUsers: () => Promise<User[]>;
}

export const fetchUsers = (): FetchQuestionsApiReturn => {
  const getAllUsers = async () => {
    return await api
      .get('users', {})
      .then((res) => res.data)
      .catch((error) => {
        return error.response.data as AxiosError;
      });
  };

  return { getAllUsers };
};
