import { MenuItem, OutlinedInput, Paper, styled, TextField } from '@mui/material';

const ContentWrapper = styled(Paper)(({ theme }) => ({
  width: '100%',
  minHeight: 860,
  [theme.breakpoints.up('sm')]: {
    padding: '16px 24px',
    flex: '1',
  },
  [theme.breakpoints.up('xl')]: {
    padding: '30px 40px',
    flex: '1',
  },
  display: 'flex',
  flexDirection: 'column',
}));
const SidebarWrapper = styled(Paper)(({ theme }) => ({
  width: 'fit-content',
  height: 'fit-content',
  '& .MuiList-root': {
    padding: '0',
  },
  '& hr': {
    padding: '0',
    margin: '10px 0 0 0 !important',
  },
  [theme.breakpoints.up('sm')]: {
    padding: '14px 10px 14px 6px',
  },
  [theme.breakpoints.up('xl')]: {
    padding: '30px 16px',
  },
}));
const SidebarItem = styled(MenuItem)(({ theme }) => ({
  textOverflow: 'eclipses',
  '& .MuiTypography-root': {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  [theme.breakpoints.up('sm')]: {
    paddingRight: '0',
    paddingLeft: '0',
  },
  [theme.breakpoints.up('xl')]: {
    paddingRight: '0',
    paddingLeft: '0',
  },
}));
export const SDefaultTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#EFEFEF',
  borderRadius: '5px',
  [theme.breakpoints.up('sm')]: {
    '& input, & .MuiSelect-select': {
      padding: '12px 14px',
    },
  },
  [theme.breakpoints.up('xl')]: {
    '& input, & .MuiSelect-select': {
      padding: '20px',
    },
  },
  '& fieldset': {
    border: 'none',
  },
}));
export const STextFieldInput = styled(SDefaultTextField)(({ theme }) => ({
  '& .MuiAutocomplete-inputRoot': {
    padding: '0 !important',
  },

  [theme.breakpoints.up('sm')]: {
    '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
      padding: '12px 14px !important',
    },
  },
  [theme.breakpoints.up('xl')]: {
    '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
      padding: '20px !important',
    },
  },
}));

export const SCalendarPickerInput = styled(SDefaultTextField)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    '& input, & .MuiSelect-select': {
      padding: '12px 14px',
    },
  },
  [theme.breakpoints.up('xl')]: {
    '& input, & .MuiSelect-select': {
      padding: '20px',
    },
  },
}));
export const SUploadInput = styled(SDefaultTextField)(() => ({}));
export const SOutlinedInput = styled(OutlinedInput)(({ theme }) => ({
  width: '100%',
  backgroundColor: '#EFEFEF',
  borderRadius: '5px',
  '& .MuiPaper-root': {
    maxHeight: '250px !important',
  },
  [theme.breakpoints.up('sm')]: {
    '& input, & .MuiSelect-select': {
      padding: '12px 14px',
    },
  },
  [theme.breakpoints.up('xl')]: {
    '& input, & .MuiSelect-select': {
      padding: '20px',
    },
  },
  '& fieldset': {
    border: 'none',
  },
}));
export { SidebarWrapper, SidebarItem, ContentWrapper };
