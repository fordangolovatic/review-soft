import { Autocomplete, Box, Chip, Stack, Switch, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useMedicalRecordQuery } from '../../../../../api/hooks/medical-record';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import { STextFieldInput } from '../../../styled';
import { FormikProps } from '../../types';
import { MedicalSkeleton } from '../MedicalSkeleton';
import data from './data.json';

type BreaksProps = FormikProps;

const Breaks: FC<BreaksProps> = ({ values, setFieldValue }: BreaksProps) => {
  const { t } = useTranslation('profile');
  const [checked, setChecked] = useState(Boolean(values.breaks?.[0]));
  const { isLoading: isLoadingMedicalRecord } = useMedicalRecordQuery();

  useEffect(() => {
    if (!isLoadingMedicalRecord && !checked) setChecked(Boolean(values.breaks?.[0]));
  }, [isLoadingMedicalRecord, values.breaks]);

  const handleToggleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFieldValue?.('breaks', []);
    setChecked(event.target.checked);
  };
  const handleChange = (value: string[]) => {
    setFieldValue?.('breaks', value);
  };
  return (
    <SkeletonCollection
      isLoading={isLoadingMedicalRecord}
      skeleton={<MedicalSkeleton />}
    >
      <Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box>
            <Typography variant={'subtitle1'}>{t('md-breaks')}</Typography>
            <Typography
              mb={{ sm: '12px', xl: '20px' }}
              color={'#828282'}
              variant={'body1'}
            >
              {t('md_breaks')}
            </Typography>
          </Box>
          <Stack>
            <Switch
              id={checked ? 'active-medical-breaks-switch' : 'medical-breaks-switch'}
              checked={checked}
              onChange={handleToggleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Stack>
        </Stack>

        {checked && (
          <Autocomplete
            limitTags={5}
            freeSolo
            multiple
            id="medical-breaks"
            defaultValue={values.breaks}
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
            renderInput={(params) => <STextFieldInput {...params} />}
            onChange={(_, value) => handleChange(value)}
          />
        )}
      </Stack>
    </SkeletonCollection>
  );
};

export default Breaks;
