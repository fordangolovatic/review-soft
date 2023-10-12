import { Autocomplete, Stack, Typography } from '@mui/material';
import React, { FC, SyntheticEvent } from 'react';
import { STextFieldInput } from '../../../../../styled';

interface MonthProps {
  onChange: (number: number) => void;
  value: number | undefined;
}

export const Month: FC<MonthProps> = ({ onChange, value }) => {
  const month: number[] = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <Stack width={'100%'} spacing={'10px'}>
      <Typography variant={'body2'} color={'secondary.dark'}>
        Month
      </Typography>

      <Autocomplete
        id="list-months"
        disableClearable
        value={isNaN(value as number) ? undefined : value}
        onChange={(e: SyntheticEvent, newValue: number | null) => {
          if (!newValue) return;
          onChange(newValue);
        }}
        getOptionLabel={(option) => {
          return option.toString() ?? '';
        }}
        options={month}
        renderInput={(params) => (
          <STextFieldInput {...params} placeholder={'Select Month'} />
        )}
      />
    </Stack>
  );
};
