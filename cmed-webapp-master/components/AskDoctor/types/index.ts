import { AccountSummary } from 'aws-sdk/clients/wellarchitected';
import { FormikErrors, FormikValues } from 'formik';
import { ChangeEvent } from 'react';

export type FormikProps = {
  values: FormikValues;
  handleChange: (e: ChangeEvent) => void;
  handleBlur: (e: FocusEvent) => void;
  errors: FormikErrors<FormikValues>;
  setFieldValue?: (field: string, value: any) => void;
  submitForm?: () => void;
};

export interface Language {
  languageId: number;
  languageName: string;
  shortCode: string;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
}

export interface Speciality {
  specialityId: number;
  specialityName: string;
  createdAt: Date;
}

export interface Question {
  questionId?: number;
  title: string;
  content: string;
  image: string;
  isAnonymous: boolean;
  speciality: Speciality;
  language: Language;
  createdBy?: AccountSummary;
  createdAt?: Date;
}

// TODO: Temporary interface Article, will be removed later
export interface Article {
  id: number;
  category: string;
  title: string;
  author: string;
  body: string;
  publish_date: string;
  views: number;
}
