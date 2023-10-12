import api from '../../config/api';

export const addFavoriteDoctor = async (doctorId: number) => {
  const res = await api.post('favorite-doctors/add', { doctorId });

  return res.data;
};
