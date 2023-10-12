import { Account, ActivityProgramItem } from '../account/account';

export enum ConsultationStatusEnum {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed',
}

export interface Consultation {
  consultationSessionId: number;
  consultationStatus: ConsultationStatusEnum;
  consultationPrice: number;
  startTime: string;
  endTime?: string;
  rating?: number; // NOTE: we need to change soon
  feedback?: string; // NOTE: we need to change after implementation
  reasonForCancellation?: string;
  translatorId?: Account;
  treatmentPlan?: string;
  comments?: string;
  patientId: number;
  doctorId: number;
  contacts?: string[]; // NOTE: we need to check this soon
  translatorConsultationPrice: number;
  isInterpretation?: boolean;
  doctor: Account;
  cancelledBy?: Account | number;
  patient: Account;
  activity: ActivityProgramItem;
  medicalRecordAgreement: boolean;
  chatStartTime?: string;
  chatEndTime?: string;
  image?: string | null;
}
