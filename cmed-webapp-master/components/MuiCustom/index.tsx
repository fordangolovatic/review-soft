import { Container, styled } from '@mui/material';

export const CustomContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '506.5px',
    width: '100%',
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '887.5px',
    width: '100%',
  },
  [theme.breakpoints.up('md')]: {
    // maxWidth: '904.5px',
    maxWidth: '1024.5px',
    width: '100%',
  },
  [theme.breakpoints.up('xl')]: {
    maxWidth: '1328px',
    width: '100%',
  },
}));
