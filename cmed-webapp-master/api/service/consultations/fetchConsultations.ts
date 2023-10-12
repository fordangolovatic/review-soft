import api from '../../config/api';
import { Consultation } from '../../types/consultations/consultations';

export const fetchConsultations = async () => {
  const res = await api.get('consultations');
  return res.data;
};
