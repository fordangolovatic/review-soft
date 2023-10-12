import { Alert, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { isNil } from 'lodash';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { ProfessionalExperience } from '../../../../../../../../api/types/account/account';
import { textFieldDataPicker } from '../../../../../../../../utilities/outdated__styles/sx';

export interface BeginWorkProps {
  onChange: (value: string) => void;
  values: ProfessionalExperience;
  initialValue: string | null;
  onError: (hasError: boolean) => void;
}

export const BeginWork: FC<BeginWorkProps> = ({
  onChange,
  initialValue,
  values: professionalValues,
  onError,
}) => {
  const [value, setValue] = React.useState<Dayjs | string | null>(initialValue);
  const [hasError, setHasError] = useState(!value);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    onError(hasError);
  }, [hasError, onError]);

  const maxStartDate = useMemo(() => {
    return professionalValues?.endDate
      ? dayjs(professionalValues?.endDate).add(-1, 'month')
      : dayjs(new Date());
  }, [professionalValues?.endDate]);

  const startDateChangeHandler = (newValue: Dayjs | null) => {
    if (value == newValue) {
      return;
    }

    const date = dayjs(value).get('d');
    const valid = !isNil(value) && !isNil(date);

    setHasError(!valid);

    if (newValue) {
      setValue(newValue);
    }

    onChange(
      `${dayjs()
        .month(Number(newValue?.get('month')))
        .format('MMM')} ${newValue?.get('year')}`,
    );
  };

  const { t } = useTranslation('profile');

  return (
    <Stack spacing={'20px'}>
      <Stack spacing={'14px'}>
        <Typography variant={'body2'} color={'secondary.dark'}>
          {t('px-beginningWork')}
        </Typography>

        <Stack spacing={'10px'} maxWidth={'400px'}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              openTo={'year'}
              label={'Select the start date of the work'}
              views={['year', 'month']}
              maxDate={maxStartDate}
              value={value}
              onChange={(value) => startDateChangeHandler(value)}
              renderInput={(params) => (
                <TextField
                  name={'begin-work-date'}
                  sx={textFieldDataPicker}
                  fullWidth
                  helperText={null}
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                    placeholder: !value
                      ? 'Example: May 2023'
                      : params.inputProps?.placeholder,
                  }}
                />
              )}
            />
          </LocalizationProvider>

          {hasError && (
            <Alert
              sx={{
                display: 'flex',
                alignItems: 'center',
                py: '0',
              }}
              variant="outlined"
              severity="error"
            >
              Incorrect date please check value
            </Alert>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};
