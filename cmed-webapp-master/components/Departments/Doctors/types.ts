import { Dayjs } from 'dayjs';
import { FormikErrors, FormikValues } from 'formik';
import { ChangeEvent } from 'react';
import { ActivityProgramItem } from '../../../api/types/account/account';
import { Speciality } from '../../../api/types/categories';
import { Country } from '../../../api/types/locations/location';
import { Language } from '../../AskDoctor/types';
import { AccountTypeEnum } from '../../Auth/SignUp';

export interface DoctorUser {
  activity_program: ActivityProgramItem[];
  professionalInfo?: string;
  userId: number;
}

export interface DoctorRating {
  rate: number;
  consultations: number;
}

export interface ProfessionalExperience {
  professionalExperienceId: number;
  speciality: string;
  position: string;
  location: string;
  startDate: Date;
  endDate: Date;
  isOngoing?: boolean;
}

export interface ProfessionalInfo {
  experienceInYears: number;
  professionalExperiences: ProfessionalExperience[];
  professionalInfoId: number;
}

export interface Doctor {
  userId: string;
  profileImage?: string;
  firstName: string;
  lastName: string;
  specialities: Speciality[];
  languages: Language[];
  country: Country;
  yearsExperience: number;
  accountType: AccountTypeEnum;
  activityProgram: ActivityProgramItem[];
  professionalInfo?: ProfessionalInfo;
  rating?: DoctorRating;
}

export interface Articles {
  articleId: number;
  content: string;
  type: string;
  image: string;
  createdAt: Date;
}

export interface DoctorProfile extends Doctor {
  professionalInfo: ProfessionalInfo;
  articles: Articles[];
  description?: string;
}

export interface IBookModalProps {
  opened: boolean;
  onClose: () => void;
  doctor: Doctor;
}
export interface IDoctorInfoProps {
  doctor: Doctor;
}
export interface ICalendarProps {
  value: null | Dayjs;
  events: FormikValues;
  setFieldValue: (field: string, value: any) => void;
}
export interface IConsultationTimePicker {
  values: FormikValues;
  setFieldValue: (field: string, value: string) => void;
}

export interface IUploadFile {
  id: number;
  title: string;
  file: any;
}
export interface IUploadInput {
  label?: string;
  placeholder?: string;
  accept?: string;
  limit?: number;
  getFiles?: (up: IUploadFile[]) => void;
  state?: IUploadFile[];
  onChange?: () => void;
  disabled?: boolean;
}

export interface BookingItemDetails {
  availableSlots: string[];
  id: number;
  price: number;
  selectedSlots: string[];
}

export interface BookingItem {
  activityProgramId: number;
  date: Date;
  price: number;
  slots: string[];
  medicalRecordAgreement: boolean;
}

export interface DoctorBooking {
  bookingItems: BookingItem[];
  allowMedicalRecords: boolean;
  anamnes: string;
  images?: string[];
}

export interface ConsultationBooking {
  doctorId: number;
  consultationPrice: number;
}

export type FormikProps = {
  values: FormikValues;
  handleChange: (e: ChangeEvent) => void;
  handleBlur: (e: FocusEvent) => void;
  errors: FormikErrors<FormikValues>;
  setFieldValue?: (field: string, value: any) => void;
  submitForm?: () => void;
};
