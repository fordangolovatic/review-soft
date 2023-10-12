import { Doctor } from '../../../components/Departments/Doctors/types';

interface FavoriteDoctorUser {
  userId: number;
  accountId: number;
  firstName: string;
  lastName: string;
}

export interface FavoriteDoctor {
  favoriteDoctorId: number;
  createdDate: Date;
  createdBy: FavoriteDoctorUser;
  doctor: Doctor;
}
