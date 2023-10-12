import { Autocomplete, Box, Chip, Stack, Switch, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useMedicalRecordQuery } from '../../../../../api/hooks/medical-record';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import { STextFieldInput } from '../../../styled';
import { FormikProps } from '../../types';
import { MedicalSkeleton } from '../MedicalSkeleton';
import data from './data.json';

type AllergiesProps = FormikProps;

const Allergies: FC<AllergiesProps> = ({
  values,
  setFieldValue,
}: AllergiesProps) => {
  const { t } = useTranslation('profile');
  const [checked, setChecked] = useState(Boolean(values.allergies?.[0]));
  const { isLoading: isLoadingMedicalRecord } = useMedicalRecordQuery();

  useEffect(() => {
    if (!isLoadingMedicalRecord && !checked)
      setChecked(Boolean(values.allergies?.[0]));
  }, [isLoadingMedicalRecord, values.allergies]);

  const handleToggleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFieldValue?.('allergies', []);
    setChecked(event.target.checked);
  };

  const handleChange = (value: string[]) => {
    setFieldValue?.('allergies', value);
  };

  return (
    <SkeletonCollection
      isLoading={isLoadingMedicalRecord}
      skeleton={<MedicalSkeleton />}
    >
      <Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box>
            <Typography variant={'subtitle1'}>{t('md-allergies')}</Typography>
            <Typography
              mb={{ sm: '12px', xl: '20px' }}
              color={'#828282'}
              variant={'body1'}
            >
              {t('md_allergies')}
            </Typography>
          </Box>
          <Stack>
            <Switch
              id={
                checked
                  ? 'active-medical-allergies-switch'
                  : 'medical-allergies-switch'
              }
              checked={checked}
              onChange={handleToggleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Stack>
        </Stack>

        {checked && (
          <Autocomplete
            freeSolo
            multiple
            id="medical-allergies"
            defaultValue={values.allergies}
            options={data.map((item) => item.title)}
            getOptionLabel={(option) => option}
            filterSelectedOptions
            renderTags={(value: readonly string[], getTagProps) =>
              value.map((option: string, index: number) => (
                <Box key={index}>
                  <Chip
                    sx={{
                      borderRadius: '5px',
                      padding: { sm: '6px 3.5px', xl: '6px 10px' },
                    }}
                    color={'darkGreen'}
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                </Box>
              ))
            }
            sx={{
              '.MuiFormControl-root': {
                paddingLeft: { sm: '3px', xl: '14px' },
              },
            }}
            ChipProps={{
              sx: {
                borderRadius: '5px',
                padding: { sm: '6px 3.5px', xl: '6px 10px' },
                '&:last-child': {
                  borderRadius: '50px',
                },
              },
              color: 'darkGreen',
            }}
            renderInput={(params) => <STextFieldInput {...params} />}
            onChange={(_, value) => handleChange(value)}
          />
        )}
      </Stack>
    </SkeletonCollection>
  );
};

export default Allergies;
