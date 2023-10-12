import { Autocomplete, Box, Chip, Stack, Switch, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useMedicalRecordQuery } from '../../../../../api/hooks/medical-record';
import { SkeletonCollection } from '../../../../SkeletonCollection';
import { STextFieldInput } from '../../../styled';
import { FormikProps } from '../../types';
import { MedicalSkeleton } from '../MedicalSkeleton';
import data from './data.json';

type OperationProps = FormikProps;

const Operations: FC<OperationProps> = ({
  values,
  setFieldValue,
}: OperationProps) => {
  const { t } = useTranslation('profile');
  const [checked, setChecked] = useState(Boolean(values.operations?.[0]));
  const { isLoading: isLoadingMedicalRecord } = useMedicalRecordQuery();

  useEffect(() => {
    if (!isLoadingMedicalRecord && !checked)
      setChecked(Boolean(values.operations?.[0]));
  }, [isLoadingMedicalRecord, values.operations]);

  const handleToggleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setFieldValue?.('operations', []);
      setChecked(event.target.checked);
    },
    [setFieldValue],
  );

  const handleChange = useCallback(
    (value: string[]) => {
      setFieldValue?.('operations', value);
    },
    [setFieldValue],
  );

  return (
    <SkeletonCollection
      isLoading={isLoadingMedicalRecord}
      skeleton={<MedicalSkeleton />}
    >
      <Stack>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Box>
            <Typography variant={'subtitle1'}>{t('md-operations')}</Typography>
            <Typography
              mb={{ sm: '12px', xl: '20px' }}
              color={'#828282'}
              variant={'body1'}
            >
              {t('md_operations')}
            </Typography>
          </Box>
          <Stack>
            <Switch
              id={
                checked
                  ? 'active-medical-operations-switch'
                  : 'medical-operations-switch'
              }
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
            id="medical-operations"
            defaultValue={values.operations}
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

export default Operations;
