import api from '../../../config/api';
import { UpdateAccount } from '../../../types/account/account';

export const updateAccount = async (updateData: UpdateAccount) => {
  return await api.patch('users/me', updateData);
};
