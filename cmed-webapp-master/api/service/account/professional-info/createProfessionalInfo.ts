import api from '../../../config/api';

export const postProfessionalInfo = async (body: any) => {
  const res = await api.post('users/professional-info', body);
  return res.data;
};
