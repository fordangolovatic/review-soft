import { Box, MenuItem, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useState } from 'react';
import departments from '../../../utilities/data/Departments';
import { STextFieldInput } from '../../Profile/styled';

const Specialities: FC = () => {
  const { t } = useTranslation('emergency');
  const [value, setValue] = useState<string>(() => t('common:selectSpecialty'));
  useEffect(() => {
    setValue(() => t('common:selectSpecialty'));
  }, [t]);
  return (
    <Stack spacing={'8px'}>
      <Typography variant={'body2'} color={'secondary.dark'}>
        {t('common:specialities')}
      </Typography>
      <Stack alignItems={'center'} spacing={'15px'} direction={'row'}>
        <Box width={'100%'} maxWidth={'300px'}>
          <STextFieldInput
            select
            onChange={(event) => {
              setValue(event.target.value);
            }}
            value={value}
          >
            <MenuItem disabled value={t('common:selectSpecialty')}>
              {t('common:selectSpecialty')}
            </MenuItem>
            {departments.items.map((specialty) => (
              <MenuItem key={specialty.id} value={specialty.value}>
                {specialty.value}
              </MenuItem>
            ))}
          </STextFieldInput>
        </Box>
        <Typography variant={'body1'} color={'primary'}>
          15$ / {t('common:session')}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Specialities;
