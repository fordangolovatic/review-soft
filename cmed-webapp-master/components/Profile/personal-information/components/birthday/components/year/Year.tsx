import { Autocomplete, MenuItem, Stack, Typography } from '@mui/material';
import React, { FC, SyntheticEvent } from 'react';
import { STextFieldInput } from '../../../../../styled';
import TextFieldInput from '../../../../../UI/Input/TextFieldInput';

interface YearProps {
  onChange: (number: number) => void;
  value: number | undefined;
}
export const Year: FC<YearProps> = ({ onChange, value }) => {
  const createYears = (m = 2040): number[] => {
    const arr = [];
    for (let i = 1890; i <= m; i++) {
      arr.push(i);
    }
    return arr.reverse();
  };

  const daysInMonth: number[] = createYears(new Date().getFullYear());

  return (
    <Stack width={'100%'} spacing={'10px'}>
      <Typography variant={'body2'} color={'secondary.dark'}>
        Year
      </Typography>

      <Autocomplete
        id="list-years"
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
          <STextFieldInput {...params} placeholder={'Select Year'} />
        )}
      />
    </Stack>
  );
};
