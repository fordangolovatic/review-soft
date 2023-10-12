import { TextField, styled } from '@mui/material';

const PriceField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    padding: '7px 15px',
    '& .MuiInputBase-input': {
      flex: 1,
      padding: '8px',
    },
    '& .MuiSvgIcon-root': {
      marginRight: '8px',
      color: '#9b9b9b',
    },
    '& fieldset': {
      border: 'none',
    },
  },
}));

export { PriceField };
