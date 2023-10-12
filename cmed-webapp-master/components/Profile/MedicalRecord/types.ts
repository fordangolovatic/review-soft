import { FormikErrors, FormikValues } from 'formik';
import { ChangeEvent } from 'react';

export type FormikProps = {
  values: FormikValues;
  handleChange: (e: ChangeEvent) => void;
  handleBlur: (e: FocusEvent) => void;
  errors: FormikErrors<FormikValues>;
  setFieldValue?: (
    field: string,
    value: string | number | string[] | boolean,
  ) => void;
  submitForm?: () => void;
  isLoading?: boolean;
};

export enum DrinkingStatus {
  OCCASIONALY = 'occasionaly',
  DAILY = 'daily',
  NEVER = 'never',
}

export type MedicalRecord = {
  medicalRecordId?: number;
  gender: string;
  medicalPhoto: string;
  weight: number;
  height: number;
  operations: string[];
  breaks: string[];
  allergies: string[];
  diseases: string[];
  medicaments: string[];
  isSmoking: boolean;
  packsPerDay: number;
  yearsOfSmoking: number;
  isDrinking: boolean;
  drinkingStatus: DrinkingStatus;
};
