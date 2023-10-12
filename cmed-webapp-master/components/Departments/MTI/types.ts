import { Dayjs } from 'dayjs';
import { Doctor } from '../Doctors/types';

export interface ILocation {
  country: string;
  city: string;
}

// We are using Doctor because we are getting the same data at the moment
export type Resident = Doctor;

export type IProfessionalInfoProps = Doctor;

export interface IResidentCardProps {
  resident: Resident;
  profile?: boolean;
  favorite?: number;
}
export interface IBookModalProps {
  opened: boolean;
  onClose: () => void;
  resident: Resident;
}
export interface IDoctorInfoProps {
  resident: Resident;
}
export interface ICalendarProps {
  value: null | Dayjs;
  onChange: (value: Dayjs | null) => void;
}
export interface IConsultationTimePicker {
  date: Dayjs | null;
  picked: number[];
  onPick: (i: number) => void;
}

export interface UploadFile {
  id: number;
  title: string;
  file: any;
}
export interface UploadInput {
  label?: string;
  placeholder?: string;
  accept?: string;
  limit?: number;
  getFiles?: (up: UploadFile[]) => void;
  state?: UploadFile[];
  onChange?: () => void;
  disabled?: boolean;
}
