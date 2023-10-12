import { Box, MenuItem, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { useMedicalRecordQuery } from '../../../../../api/hooks/medical-record';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import { STextFieldInput } from '../../../styled';
import { FormikProps } from '../../types';
import { MedicalSkeleton } from '../MedicalSkeleton';

type GenderProps = FormikProps;

const Genders = [
  { id: 1, value: 'Masculine' },
  { id: 2, value: 'Feminine' },
];

const Gender: FC<GenderProps> = ({ values, handleChange }: GenderProps) => {
  const { t } = useTranslation('profile');
  const { isLoading: isLoadingMedicalRecord } = useMedicalRecordQuery();

  return (
    <SkeletonCollection
      isLoading={isLoadingMedicalRecord}
      skeleton={<MedicalSkeleton />}
    >
      <Box>
        <Typography variant={'subtitle1'}>{t('md-gender')}</Typography>
        <Typography
          mb={{ sm: '12px', xl: '20px' }}
          color={'#828282'}
          variant={'body1'}
        >
          {t('md_gender')}
        </Typography>
        <Stack direction={'row'} spacing={{ sm: '15px', xl: '20px' }}>
          <STextFieldInput
            id={'gender-selector'}
            name="gender"
            select
            value={values.gender ?? 'Gender'}
            onChange={handleChange}
          >
            <MenuItem disabled value={'Gender'}>
              {t('md-gender')}
            </MenuItem>
            {Genders.map((item) => (
              <MenuItem key={item.id} value={item.value}>
                {item.value}
              </MenuItem>
            ))}
          </STextFieldInput>
        </Stack>
      </Box>
    </SkeletonCollection>
  );
};

export default Gender;
