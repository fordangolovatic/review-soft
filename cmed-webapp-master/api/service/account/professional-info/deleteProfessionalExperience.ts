import api from '../../../config/api';

export const deleteProfessionalExperience = async (id: number) => {
  const res = await api.delete(`users/professional-experience/${id}`);
  return res.data;
};
