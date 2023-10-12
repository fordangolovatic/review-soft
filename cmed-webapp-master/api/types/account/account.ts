import { Language, Speciality } from '../../../components/AskDoctor/types';
import { City, Country, State } from '../locations/location';

// TODO - we should most likely need to remove the Account interface and separate each interface to its file
// TODO - Code debth
export interface Account {
  userId: number;
  firstName: string;
  lastName: string;
  description: string;
  accountTypeId: number;
  accountType?: string;
  gender: string | null;
  address: string | null;
  postalCode: string | null;
  email: string;
  parentAccountId: number | null;
  dateOfBirth: Date | null;
  profileImage: string | null;
  isTranslator: boolean;
  isVerified: boolean;
  termsAndConditionAccepted: boolean;
  country: Country | null;
  city: City | null;
  state: State | null;
  languages?: Language[];
}

// TODO - Code debth
export interface UpdateAccount {
  userId?: number | null;
  firstName?: string | null;
  lastName?: string | null;
  description?: string | null;
  accountTypeId?: number | null;
  gender?: string | null;
  address?: string | null;
  cityId?: number | null;
  countryId?: number | null;
  stateId?: number | null;
  postalCode?: string | null;
  email?: string;
  parentAccountId?: number | null;
  isTranslator?: boolean | null;
  isVerified?: boolean | null;
  dateOfBirth?: Date | null;
  termsAndConditionAccepted?: boolean | null;
  profileImage?: string | null;
  languages: Language[] | null;
}

export interface ProfessionalExperience {
  professionalExperienceId: number | null;
  speciality: string;
  position: string;
  location: string;
  startDate: string | null;
  endDate: string | null;
  isOngoing: boolean;
}

export interface ProfessionalInformation {
  professionalInfoId: number;
  experienceInYears: number;
  specialities: Speciality[];
  professionalExperiences: ProfessionalExperience[];
}

export interface ProfessionalInfoCreate {
  experienceInYears: number;
  professionalExperiences: ProfessionalExperience[];
  specialities: number[];
}

// TODO - Radu, code-depth: hardcoded ids
export const ACCOUNT_TYPES = [
  { id: 1, title: 'Patient' },
  { id: 2, title: 'Doctor' },
  { id: 3, title: 'Resident' },
];

export interface ConsultationItem {
  consultationSessionId: number;
  consultationPrice: number;
  doctorId: number;
  patientId: number;
  startTime: string;
  endTime?: string;
}

export interface ActivityProgramItem {
  id?: number;
  date: Date;
  price: number;
  slots: string[];
  consultations?: ConsultationItem[];
}
