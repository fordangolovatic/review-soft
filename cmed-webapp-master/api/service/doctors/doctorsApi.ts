import { AxiosError } from 'axios';
import {
  Doctor,
  DoctorProfile,
} from '../../../components/Departments/Doctors/types';
import { SortOptions } from '../../../components/FiltersCollection/components/CollapseMenu';
import api from '../../config/api';

export type ApiFilters = { [k: string]: string[] };

interface DoctorsApiReturn {
  getAllDoctors: (filters?: ApiFilters, sort?: SortOptions) => Promise<Doctor[]>;
  getDoctorProfile: (doctorId: number) => Promise<DoctorProfile>;
}

const doctorsApi = (): DoctorsApiReturn => {
  const getAllDoctors = async (
    filters?: ApiFilters,
    sort?: SortOptions,
  ): Promise<Doctor[]> => {
    return await api
      .get('doctors', {
        params: {
          ...filters,
          sort,
        },
      })
      .then((res) => res.data)
      .catch((error) => {
        return error.response.data as AxiosError;
      });
  };

  const getDoctorProfile = async (doctorId: number): Promise<DoctorProfile> => {
    return await api
      .get(`doctors/${doctorId}`)
      .then((res) => res.data)
      .catch((error) => {
        return error.response.data as AxiosError;
      });
  };

  return { getAllDoctors, getDoctorProfile };
};
export default doctorsApi;
