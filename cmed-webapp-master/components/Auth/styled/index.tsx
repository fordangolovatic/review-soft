import { Box, Button, styled, TextField } from '@mui/material';

const Input = styled(TextField)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    '& .MuiInputBase-root': {
      height: '44px',
      width: '100%',
    },
  },
  [theme.breakpoints.up('xl')]: {
    '& .MuiInputBase-root': {
      height: '65px',
      width: '100%',
    },
  },
}));
const SubmitButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    padding: '13px 0',
    width: '100%',
  },
  [theme.breakpoints.up('xl')]: {
    padding: '20px 0',
    width: '100%',
  },
}));
const SocialButton = styled(Button)(({ theme }) => ({
  borderRadius: '5px',
  borderColor: '#818181',
  color: '#424242',
  ...theme.typography.body2,

  [theme.breakpoints.up('sm')]: {
    padding: '7px 0',
    width: '100%',
    '& svg': {
      width: '16px',
    },
  },
  [theme.breakpoints.up('xl')]: {
    padding: '10px 0',
    width: '100%',
    '& svg': {
      width: '24px',
    },
  },
}));

const AuthWrapper = styled(Box)(({ theme }) => ({
  zIndex: '99999',
  backgroundColor: 'white',
  transition: 'all 0.7s',
  height: '100%',
  [theme.breakpoints.up('sm')]: {
    borderTopLeftRadius: '20px',
    position: 'relative',
    right: '-1000px',
    top: '0',
    bottom: '0',
    maxWidth: '400px',
    width: '100%',
    padding: '91px 60px',
  },
  [theme.breakpoints.up('xl')]: {
    borderTopLeftRadius: '20px',
    position: 'relative',
    right: '-1000px',
    top: '0',
    bottom: '0',
    maxWidth: '600px',
    width: '100%',
    padding: '60px 40px',
  },
}));

export { Input, SocialButton, SubmitButton, AuthWrapper };
