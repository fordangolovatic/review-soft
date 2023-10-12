import { Alert, Checkbox, Stack, TextField, Typography } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { isNil } from 'lodash';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useState } from 'react';
import { ProfessionalExperience } from '../../../../../../../../api/types/account/account';
import { textFieldDataPicker } from '../../../../../../../../utilities/outdated__styles/sx';

export interface EndWorkProps {
  onChange: (value: string | null) => void;
  onChangeOngoing: (value: boolean) => void;
  isOngoing: boolean | undefined;
  initialValue: string | null;
  values: ProfessionalExperience;
  onError: (hasError: boolean) => void;
}

export const EndWork: FC<EndWorkProps> = ({
  onChange,
  onChangeOngoing,
  initialValue,
  isOngoing,
  values: professionalValues,
  onError,
}) => {
  const { t } = useTranslation('profile');
  const [value, setValue] = useState(initialValue);
  const [checked, setChecked] = useState<boolean>(isOngoing || false);
  const [disabled, setDisabled] = useState(isOngoing ? true : false);
  const [hasError, setHasError] = useState(isOngoing ? false : !value);

  useEffect(() => {
    if (isOngoing != null) {
      setChecked(isOngoing);

      if (isOngoing) {
        setHasError(false);
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [isOngoing]);

  useEffect(() => {
    onError(hasError);
  }, [hasError, onError]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const date = dayjs(value).get('d');
    const valid = checked ? true : !isNil(value) && !isNil(date);
    setHasError(!valid);
  }, [value, checked]);

  const onCheckHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const checked = event.target.checked;
    setChecked(checked);
    setValue(null);
    onChange(null);
    onChangeOngoing(checked);
  };

  const onEndDateChange = (newValue: Dayjs | null) => {
    if (!newValue && hasError) {
      return;
    }

    const date = dayjs(newValue).get('d');
    const valid = !isNil(newValue) && !isNil(date);
    setHasError(!valid);

    const updatedValue = `${dayjs()
      .month(Number(newValue?.get('month')))
      .format('MMM')} ${newValue?.get('year')}`;

    onChange(updatedValue);
  };

  return (
    <Stack>
      <Stack spacing={'20px'} alignItems={'center'} direction={'row'}>
        <Typography whiteSpace={'nowrap'} variant={'body2'} color={'secondary.dark'}>
          {t('px-endingWork')}
        </Typography>

        <Stack
          width={'100%'}
          maxWidth={'400px'}
          direction={'row'}
          alignItems={'center'}
        >
          <Checkbox
            name={'switch-working-now'}
            size={'small'}
            checked={checked}
            onChange={onCheckHandler}
            inputProps={{ 'aria-label': 'controlled' }}
          />

          <Typography variant={'caption'} color={'#818181'}>
            {t('px-workNow')}
          </Typography>
        </Stack>
      </Stack>

      <Stack spacing={'10px'} maxWidth={'400px'}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            openTo={'year'}
            disabled={disabled}
            label={'Select the end date of the work'}
            views={['year', 'month']}
            minDate={dayjs(professionalValues?.startDate).add(1, 'month')}
            maxDate={dayjs(new Date())}
            value={value}
            onChange={(value) => onEndDateChange(value)}
            renderInput={(params) => (
              <TextField
                name={'end-work-date'}
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
  );
};
