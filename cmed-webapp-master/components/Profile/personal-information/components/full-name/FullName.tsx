import { Box, Stack, Typography } from '@mui/material';
import { FormikErrors, FormikValues } from 'formik';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, FC } from 'react';
import { useAccountQuery } from '../../../../../api/hooks/account';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import TextFieldInput from '../../../UI/Input/TextFieldInput';
import { SearchBarSkeleton } from './SearchBarSkeleton';

export type FormikProps = {
  values: FormikValues;
  handleChange: (e: ChangeEvent) => void;
  handleBlur: (e: FocusEvent) => void;
  errors: FormikErrors<FormikValues>;
  setFieldValue?: (field: string, value: any) => void;
  submitForm?: () => void;
};

type FullNameProps = FormikProps;

export const FullName: FC<FullNameProps> = ({
  values,
  handleChange,
  handleBlur,
}) => {
  const { t } = useTranslation('profile');
  const translations = {
    fullName: t('pI-fullName'),
    _fullName: t('pI-_fullName'),
  };

  const { isLoading: isLoadingAccount } = useAccountQuery();

  return (
    <SkeletonCollection
      isLoading={isLoadingAccount}
      skeleton={<SearchBarSkeleton />}
    >
      <Box pb={1}>
        <Typography variant={'subtitle1'}>{translations.fullName}</Typography>

        <Typography
          mb={{ sm: '12px', xl: '20px' }}
          color={'#828282'}
          variant={'body1'}
        >
          {translations._fullName}
        </Typography>

        <Stack direction={'row'} spacing={{ sm: '15px', xl: '20px' }}>
          <TextFieldInput
            name="firstName"
            label={'First Name'}
            value={values?.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <TextFieldInput
            name="lastName"
            label={'Last Name'}
            value={values?.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Stack>
      </Box>
    </SkeletonCollection>
  );
};
