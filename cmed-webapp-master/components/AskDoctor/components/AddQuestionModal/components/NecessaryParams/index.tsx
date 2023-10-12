import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FC } from 'react';
import { FormikProps } from '../../../../types';
import { Speciality, Language } from './components';

type NecessaryParamsProps = FormikProps;

export const NecessaryParams: FC<NecessaryParamsProps> = (formikProps) => {
  return (
    <Stack spacing={'10px'}>
      <Typography sx={{ color: grey[600] }} variant={'subtitle1'}>
        Set the necessary parameters for your topic
      </Typography>
      <Stack direction={'row'} spacing={'20px'}>
        <Speciality {...formikProps} />
        <Language {...formikProps} />
      </Stack>
    </Stack>
  );
};
