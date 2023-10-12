import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { FC } from 'react';
import { STextFieldInput } from '../../../../../Profile/styled';
import { FormikProps } from '../../../../types';

type TitleProps = FormikProps;

export const Title: FC<TitleProps> = ({ handleChange, values }) => {
  return (
    <Stack spacing={'8px'}>
      <Typography variant={'subtitle1'} sx={{ color: grey[600] }}>
        Title
      </Typography>
      <STextFieldInput
        onChange={handleChange}
        value={values.title}
        name={'title'}
        placeholder={'Enter name for article'}
      />
    </Stack>
  );
};
