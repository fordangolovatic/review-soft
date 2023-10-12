import { MedicalRecord } from '../../../../components/Profile/MedicalRecord/types';
import api from '../../../config/api';

const medicalRecordApi = () => {
  const getMedicalRecord = async () => {
    return await api.get('users/medical-record');
  };

  const getMedicalRecordByUserId = async (id: number) => {
    return await api.get(`users/medical-record/${id}`);
  };

  const createMedicalRecord = async (
    medicalData: MedicalRecord,
  ): Promise<boolean> => {
    return await api
      .post('users/medical-record', medicalData)
      .then((res) => res.status === 200 || res.status === 204)
      .catch((e) => {
        console.log(e);
        return false;
      });
  };
  const updateMedicalRecord = async (
    newMedicalData: MedicalRecord,
  ): Promise<boolean> => {
    return await api
      .patch('users/medical-record', newMedicalData)
      .then((res) => res.status === 200 || res.status === 204)
      .catch(() => {
        return false;
      });
  };

  return {
    getMedicalRecord,
    getMedicalRecordByUserId,
    createMedicalRecord,
    updateMedicalRecord,
  };
};
export default medicalRecordApi;
