import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { FC } from 'react';
import { FormikProps } from '../../../../Profile/personal-information/components/full-name/FullName';
import { STextFieldInput } from '../../../../Profile/styled';

type TitleProps = FormikProps;

export const Title: FC<TitleProps> = ({ values, handleChange }) => {
  return (
    <Stack spacing={'8px'}>
      <Typography variant={'subtitle1'} sx={{ color: grey[600] }}>
        Title
      </Typography>
      <STextFieldInput
        name={'title'}
        value={values.title}
        onChange={handleChange}
        placeholder={'Enter name for article'}
      />
    </Stack>
  );
};
