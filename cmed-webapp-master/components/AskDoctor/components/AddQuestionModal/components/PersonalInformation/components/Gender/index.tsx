import { MenuItem, Stack, Typography } from '@mui/material';
import React, { FC, useState } from 'react';
import { STextFieldInput } from '../../../../../../../Profile/styled';

const Gender: FC = () => {
  const [value, setValue] = useState('Gender');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value as string);
  };
  const Genders = [
    { id: 1, value: 'Masculine' },
    { id: 2, value: 'Feminine' },
  ];
  return (
    <Stack spacing={'10px'}>
      <Typography variant={'body2'} color={'secondary.dark'}>
        Gender
      </Typography>
      <Stack direction={'row'} spacing={{ sm: '15px', xl: '20px' }}>
        <STextFieldInput select value={value} onChange={onChange}>
          <MenuItem disabled value={'Gender'}>
            Gender
          </MenuItem>
          {Genders.map((item) => (
            <MenuItem key={item.id} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </STextFieldInput>
      </Stack>
    </Stack>
  );
};

export default Gender;
