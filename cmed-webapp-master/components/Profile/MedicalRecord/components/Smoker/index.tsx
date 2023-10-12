import { Box, Stack, Switch, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useMedicalRecordQuery } from '../../../../../api/hooks/medical-record';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import { STextFieldInput } from '../../../styled';
import { FormikProps } from '../../types';
import { MedicalSkeleton } from '../MedicalSkeleton';

type SmokerProps = FormikProps;

const Smoker: FC<SmokerProps> = ({ values, setFieldValue }: SmokerProps) => {
  const { t } = useTranslation('profile');
  const [checked, setChecked] = React.useState(values.isSmoking);
  const [packs, setPacks] = useState<number>(values.packsPerDay);
  const [years, setYears] = useState<number>(values.yearsOfSmoking);

  const { isLoading: isLoadingMedicalRecord } = useMedicalRecordQuery();

  useEffect(() => {
    if (!isLoadingMedicalRecord && !checked) setChecked(values.isSmoking);
  }, [checked, isLoadingMedicalRecord, values.isSmoking]);

  const handleChangePacks = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPacks = packs < 0 ? 0 : Number(e.target.value);
      setPacks(newPacks);
      setFieldValue?.('packsPerDay', newPacks);
    },
    [packs, setFieldValue],
  );

  const handleChangeYears = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newYears = years < 0 ? 0 : Number(e.target.value);
      setYears(newYears);
      setFieldValue?.('yearsOfSmoking', newYears);
    },
    [setFieldValue, years],
  );

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (!event.target.checked) {
      setFieldValue?.('isSmoking', false as boolean);
      setFieldValue?.('packsPerDay', 0);
      setFieldValue?.('yearsOfSmoking', 0);
    }
    setChecked(event.target.checked);
    setFieldValue?.('isSmoking', event.target.checked);
  };

  return (
    <SkeletonCollection
      isLoading={isLoadingMedicalRecord}
      skeleton={<MedicalSkeleton />}
    >
      <Box>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box>
            <Typography variant={'subtitle1'}>{t('md-smoker')}</Typography>
            <Typography
              mb={{ sm: '12px', xl: '20px' }}
              color={'#828282'}
              variant={'body1'}
            >
              {t('md_smoker')}
            </Typography>
          </Box>
          <Stack>
            <Switch
              id={checked ? 'active-medical-smoker-switch' : 'medical-smoker-switch'}
              checked={checked ?? false}
              onChange={handleToggleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Stack>
        </Stack>
        {checked && (
          <Stack direction={'row'} spacing={{ sm: '15px', xl: '20px' }}>
            <Stack spacing={'10px'} width={'100%'}>
              <Typography variant={'body2'} color={'secondary.dark'}>
                Cigarettes
              </Typography>
              <STextFieldInput
                name="packsPerDay"
                placeholder={'Packs smoked per day'}
                value={values.packsPerDay}
                onChange={handleChangePacks}
                type={'number'}
              />
            </Stack>
            <Stack spacing={'10px'} width={'100%'}>
              <Typography variant={'body2'} color={'secondary.dark'}>
                Years smoke
              </Typography>
              <STextFieldInput
                name="yearsOfSmoking"
                placeholder={'Years as a smoker'}
                value={values.yearsOfSmoking}
                onChange={handleChangeYears}
                type={'number'}
              />
            </Stack>
          </Stack>
        )}
      </Box>
    </SkeletonCollection>
  );
};

export default Smoker;
