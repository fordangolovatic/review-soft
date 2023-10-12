import api from '../../config/api';

const DoctorApi = () => {
  const getDoctorsList = async () => {
    const res = await api.get('doctors');
    return res.data;
  };

  return { getDoctorsList };
};
export default DoctorApi;
