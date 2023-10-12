import api from '../../../config/api';

const ProfessionalInfoApi = () => {
  const getProfessionalInfo = async () => {
    const res = await api.get('users/professional-info');
    return res.data;
  };

  const patchProfessionalInfo = async (body: any) => {
    const res = await api.patch('users/professional-info', body);
    return res.data;
  };

  const postProfessionalInfo = async (body: any) => {
    const res = await api.post('users/professional-info', body);
    return res.data;
  };

  const deleteProfessionalExperience = async (id: number) => {
    const res = await api.delete(`users/professional-experience/${id}`);
    return res.data;
  };

  return {
    getProfessionalInfo,
    patchProfessionalInfo,
    postProfessionalInfo,
    deleteProfessionalExperience,
  };
};

export default ProfessionalInfoApi;
