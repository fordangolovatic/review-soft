import { styled, TextField } from '@mui/material';

const Input = styled(TextField)(() => ({
  border: '0',
  outline: 'none',
  background: '#EFEFEF',
  borderRadius: '10px',
  '& > div > input': {
    border: 0,
    outline: 'none',
    padding: 8,
  },
}));

export { Input };
