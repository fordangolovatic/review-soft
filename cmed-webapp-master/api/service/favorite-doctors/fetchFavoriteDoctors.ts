import api from '../../config/api';

export const fetchFavoriteDoctors = async () => {
  const res = await api.get('favorite-doctors');

  return res.data;
};
