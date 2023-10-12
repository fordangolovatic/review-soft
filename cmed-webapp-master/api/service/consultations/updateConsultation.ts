import api from '../../config/api';
import { Consultation } from '../../types/consultations/consultations';

export const updateConsultation = async (consultation: Consultation) => {
  return await api
    .patch(`consultations/${consultation.consultationSessionId}`, consultation)
    .then((res) => res.data);
};
