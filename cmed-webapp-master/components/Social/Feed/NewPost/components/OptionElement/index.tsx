import { SvgIconTypeMap, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { OverridableComponent } from '@mui/types';
import React from 'react';

interface IOptionElementProps {
  Icon: OverridableComponent<SvgIconTypeMap<unknown, 'svg'>>;
  label: string;
}

const OptionElement = ({ Icon, label }: IOptionElementProps) => {
  return (
    <Stack
      color={'#00A04A'}
      direction={'row'}
      gap={'10px'}
      alignItems={'center'}
      sx={{ cursor: 'pointer' }}
    >
      <Icon color={'inherit'} fontSize={'small'} />
      <Typography color={'#000'} sx={{ display: { xs: 'none', md: 'block' } }}>
        {label}
      </Typography>
    </Stack>
  );
};

export default OptionElement;
