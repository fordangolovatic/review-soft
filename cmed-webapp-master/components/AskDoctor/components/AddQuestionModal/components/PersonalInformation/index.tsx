import { Box, Checkbox, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { FormikProps } from '../../../../types';

type PersonalInformationProps = FormikProps;

export const PersonalInformation: FC<PersonalInformationProps> = ({
  values,
  setFieldValue,
}) => {
  return (
    <Stack>
      <Stack direction={'row'}>
        <Stack
          spacing={'6px'}
          alignItems={'center'}
          justifyContent={'flex-start'}
          direction={'row'}
        >
          <Box>
            <Checkbox
              value={values.isAnonymous}
              onChange={(e, newValue) => setFieldValue?.('isAnonymous', newValue)}
              sx={{
                padding: 0,
              }}
              size={'small'}
            />
          </Box>
          <Typography variant={'body2'}>
            Add an anonymous question, only the doctor will see the name
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
