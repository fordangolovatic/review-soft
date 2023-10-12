import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, FC, useState } from 'react';
import { STextFieldInput } from '../../../../../../styled';

export interface PositionProps {
  onChange: (value: string) => void;
  initialValue?: string;
}

export const Position: FC<PositionProps> = ({ onChange, initialValue }) => {
  const { t } = useTranslation('profile');
  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = e;
    setValue(value);
    onChange(value);
  };

  return (
    <Stack spacing={'14px'}>
      <Typography whiteSpace={'nowrap'} variant={'body2'} color={'secondary.dark'}>
        {t('px-position')}
      </Typography>
      <STextFieldInput
        name={'position'}
        value={value}
        onChange={handleChange}
        placeholder={'Im working in'}
      />
    </Stack>
  );
};
