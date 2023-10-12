import { styled, Box, TextField } from '@mui/material';

const MedicalRecordDetailBox = styled(Box)(({ theme }) => ({
  alignItems: 'space-between',
  justifyContent: 'center',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('md')]: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
}));

const MedicalRecordDetailListBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
}));

const ChatExpireField = styled(TextField)(() => ({
  '& .MuiInputBase-root': {
    backgroundColor: '#f0f0f0',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center',
    padding: '4px 15px',
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

export { MedicalRecordDetailBox, MedicalRecordDetailListBox, ChatExpireField };
