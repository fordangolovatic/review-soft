import {
  DoctorBooking,
  ConsultationBooking,
} from '../../../components/Departments/Doctors/types';
import api from '../../config/api';

export const createConsultation = async (consultation: ConsultationBooking) => {
  return await api.post('consultations', consultation).then((res) => res.data);
};
