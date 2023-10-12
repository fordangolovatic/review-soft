import { styled, TextField } from '@mui/material';
import Select from '@mui/material/Select';

const Input = styled(TextField)(() => ({
  width: '100%',
  border: '0',
  outline: 'none',
  '& > div': {
    borderRadius: '50px',
  },
  '& > div > input': {
    width: '100%',
    padding: 0,
    paddingTop: 16,
    paddingBottom: 16,

    paddingLeft: 30,
    borderBottom: 0,
    borderRadius: 50,
  },
}));

const SearchField = styled(TextField)(() => ({
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
  },
}));
const SortingSelect = styled(Select)(({ theme }) => ({
  minWidth: '100px',
  '& .MuiSelect-select': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));
export { Input, SearchField, SortingSelect };
