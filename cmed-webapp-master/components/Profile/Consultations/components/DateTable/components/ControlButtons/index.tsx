import { Consultation } from '../../../../../../../api/types/consultations/consultations';

export { PendingButtons } from './PendingButtons';
export { ConfirmedButtons } from './ConfirmedButtons';
export { PatientButtons } from './PatientButtons';

export interface ControlButtonProps {
  consultation: Consultation;
}
