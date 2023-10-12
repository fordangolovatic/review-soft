import {
  Autocomplete,
  Box,
  MenuItem,
  Stack,
  Switch,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useMedicalRecordQuery } from '../../../../../api/hooks/medical-record';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import { STextFieldInput } from '../../../styled';
import { FormikProps } from '../../types';
import { MedicalSkeleton } from '../MedicalSkeleton';

type AlcoholProps = FormikProps;

const alcoholOptions = [
  { id: 1, title: 'never' },
  { id: 2, title: 'daily' },
  { id: 3, title: 'occasionally' },
];

const Alcohol: FC<AlcoholProps> = ({
  values,
  setFieldValue,
  isLoading,
}: AlcoholProps) => {
  const { t } = useTranslation('profile');
  const [checked, setChecked] = useState(values.isDrinking);
  const { isLoading: isLoadingMedicalRecord } = useMedicalRecordQuery();

  useEffect(() => {
    if (!isLoadingMedicalRecord && !checked) setChecked(values.isDrinking);
  }, [checked, isLoadingMedicalRecord, values.isDrinking]);

  const handleToggleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFieldValue?.('isDrinking', event.target.checked);
    setChecked(event.target.checked);
  };

  const handleChange = useCallback(
    (value: string[]) => {
      setFieldValue?.('drinkingStatus', value);
    },
    [setFieldValue],
  );

  return (
    <SkeletonCollection isLoading={isLoading} skeleton={<MedicalSkeleton />}>
      <Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box>
            <Typography variant={'subtitle1'}>{t('md-alcohol')}</Typography>
            <Typography
              mb={{ sm: '12px', xl: '20px' }}
              color={'#828282'}
              variant={'body1'}
            >
              {t('md_alcohol')}
            </Typography>
          </Box>
          <Stack>
            <Switch
              id={
                checked ? 'active-medical-alcohol-switch' : 'medical-alcohol-switch'
              }
              checked={checked}
              onChange={handleToggleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Stack>
        </Stack>
        {checked && (
          <Stack direction={'row'} spacing={{ sm: '15px', xl: '20px' }}>
            <Autocomplete
              id="medical-alcohol"
              renderInput={(params) => <STextFieldInput {...params} fullWidth />}
              options={alcoholOptions.map(
                (option) =>
                  option.title.charAt(0).toUpperCase() + option.title.slice(1),
              )}
              fullWidth
              defaultValue={
                values.drinkingStatus.charAt(0).toUpperCase() +
                values.drinkingStatus.slice(1)
              }
              onChange={(_, value) => handleChange(value.toLowerCase())}
            />
          </Stack>
        )}
      </Stack>
    </SkeletonCollection>
  );
};

export default Alcohol;
