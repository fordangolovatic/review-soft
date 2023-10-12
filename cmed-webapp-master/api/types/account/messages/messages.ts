import { Consultation } from '../../consultations/consultations';
import { Account } from '../account';

export interface SummaryMessage {
  message_id: number;
  content: string;
  createdAt: Date;
  is_read: boolean | null;
  from: number;
  from_firstName: string;
  from_lastName: string;
  from_profileImage: string;
  to_firstName: string;
  to_lastName: string;
  to_profileImage: string;
  to: number;
  subject?: string;
}

export interface Message {
  messageId: number;
  content: string;
  createdAt: Date;
  is_read: boolean;
  from: Account;
  to: Account;
  subject?: string;
  consultation?: Consultation;
}

export interface SendMessage {
  from: number;
  to: number;
  content: string;
  subject?: string;
  consultationId?: number;
}
