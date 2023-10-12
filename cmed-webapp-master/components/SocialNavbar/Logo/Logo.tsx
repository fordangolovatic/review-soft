import { Box, styled } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react';
import { Icons } from '../../../utilities/icons';

const CustomBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '113px',
    height: '23px',
    marginBottom: '8px',
  },
  [theme.breakpoints.up('sm')]: {
    width: '117px',
    height: '27px',
  },
  [theme.breakpoints.up('md')]: {
    width: '117px',
    height: '28px',
  },
  [theme.breakpoints.up('xl')]: {
    width: '174px',
    height: '40px',
  },
}));

const Logo: FC = () => {
  return (
    <Link href={'/'}>
      <CustomBox>
        <Icons.Logo />
      </CustomBox>
    </Link>
  );
};

export default Logo;
