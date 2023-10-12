import { Stack, Typography } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { useProfessionalInformationQuery } from '../../../../../api/hooks/professional-information';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import { FormikProps } from '../../../personal-information/components/full-name/FullName';
import { STextFieldInput } from '../../../styled';
import { TextFieldSkeleton } from '../Specialities/TextFieldSkeleton';

type ExperienceProps = FormikProps;

const Experience: FC<ExperienceProps> = ({ values, handleChange }) => {
  const { t } = useTranslation('profile');
  const { isLoading: isLoadingProfessionalInformation } =
    useProfessionalInformationQuery();

  return (
    <SkeletonCollection
      skeleton={<TextFieldSkeleton />}
      isLoading={isLoadingProfessionalInformation}
    >
      <Stack width={'100%'} spacing={'10px'}>
        <Typography variant={'body1'} color={'secondary.dark'}>
          {`${t('common:experience')} (${t('px-years')})`}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <STextFieldInput
            name="experienceInYears"
            value={values.experienceInYears}
            onChange={handleChange}
          />
        </LocalizationProvider>
      </Stack>
    </SkeletonCollection>
  );
};

export default Experience;
