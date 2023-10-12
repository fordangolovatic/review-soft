import { Autocomplete, Stack, Typography } from '@mui/material';
import React, { FC, SyntheticEvent } from 'react';
import { STextFieldInput } from '../../../../../styled';

interface DayProps {
  onChange: (number: number) => void;
  value: number | undefined;
}

export const Day: FC<DayProps> = ({ onChange, value }) => {
  const daysInMonth: number[] = Array.from(
    { length: 31 || 0 },
    (_, index) => index + 1,
  );

  return (
    <Stack width={'100%'} spacing={'10px'}>
      <Typography variant={'body2'} color={'secondary.dark'}>
        Day
      </Typography>

      <Autocomplete
        id="list-days"
        disableClearable
        value={isNaN(value as number) ? undefined : value}
        onChange={(e: SyntheticEvent, newValue: number | null) => {
          if (!newValue) return;
          onChange(newValue);
        }}
        getOptionLabel={(option) => {
          return option.toString() ?? '';
        }}
        options={daysInMonth}
        renderInput={(params) => (
          <STextFieldInput {...params} placeholder={'Select Day'} />
        )}
      />
    </Stack>
  );
};
