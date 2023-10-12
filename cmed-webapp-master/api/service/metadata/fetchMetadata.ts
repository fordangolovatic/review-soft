import api from '../../config/api';

export const fetchMetadata = async () => {
  return await api.get('metadata').then((res) => res.data);
};
