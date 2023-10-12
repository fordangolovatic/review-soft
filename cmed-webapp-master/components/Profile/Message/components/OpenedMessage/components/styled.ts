import { TextField, styled } from '@mui/material';

const MessageInput = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    padding: '7px 8px',
    '& fieldset': {
      borderRadius: '90px',
    },
    '& .MuiInputBase-input': {
      flex: 1,
      padding: '8px',
    },
    '& .MuiSvgIcon-root': {
      marginRight: '8px',
      color: '#9b9b9b',
    },
  },
}));

export { MessageInput };
