import api from '../../../config/api';

export const patchProfessionalInfo = async (body: any) => {
  const res = await api.patch('users/professional-info', body);
  return res.data;
};
