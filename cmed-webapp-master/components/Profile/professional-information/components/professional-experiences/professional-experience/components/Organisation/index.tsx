import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, FC, useState } from 'react';
import { STextFieldInput } from '../../../../../../styled';

export interface OrganisationProps {
  onChange: (value: string) => void;
  initialValue?: string;
}

export const Organisation: FC<OrganisationProps> = ({ onChange, initialValue }) => {
  const { t } = useTranslation('profile');
  const [value, setValue] = useState<string | undefined>(initialValue);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = e;
    setValue(value);
    onChange(value);
  };

  return (
    <Stack spacing={'14px'}>
      <Typography whiteSpace={'nowrap'} variant={'body2'} color={'secondary.dark'}>
        {t('px-organisation')}
      </Typography>
      <STextFieldInput
        name={'organisation'}
        value={value}
        onChange={onChangeHandler}
        placeholder={'Name of organisation'}
      />
    </Stack>
  );
};
