import { Language } from '../../../components/AskDoctor/types';
import { Speciality } from '../categories';

export interface CreateArticle {
  content: string;
  type: string;
  image: string;
  languageId: Language;
  specialityId: Speciality;
  title: string;
}

type AccountSummary = {
  userId: string;
  accountId: string;
  firstName: string;
  lastName: string;
};

export interface Article {
  articleId: number;
  content: string;
  type: string;
  image?: string;
  createdAt: string;
  title: string;
  language?: Language;
  speciality?: Speciality;
  createdBy: AccountSummary;
}

export interface UpdateArticle {
  articleId: number;
  type: string;
  title: string;
  content: string;
  image: string;
  specialityId?: number | null;
  languageId?: number | null;
}
