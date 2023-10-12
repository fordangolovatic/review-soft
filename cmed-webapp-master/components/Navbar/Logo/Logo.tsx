import { Box, styled } from '@mui/material';
import Link from 'next/link';
import React, { FC, useCallback, useState } from 'react';
import { Icons } from '../../../utilities/icons';
import { FeatureFlagsDialog } from './FeatureFlagsDialog';

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
  transform: 'translateY(-8px)',
}));
const Logo: FC = () => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleLogoClick = () => {
    setOpen(true);
  };

  return (
    <Link id={'logo'} href={'/'}>
      <CustomBox onDoubleClick={handleLogoClick}>
        <Icons.Logo />
      </CustomBox>
      <FeatureFlagsDialog open={open} handleClose={handleClose} />
    </Link>
  );
};

export default Logo;
