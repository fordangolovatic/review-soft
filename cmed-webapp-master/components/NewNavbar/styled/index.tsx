import { InputBase, styled } from '@mui/material';

interface SearchProps {
  disabled?: boolean;
}

const Search = styled('div')<SearchProps>((props) => ({
  position: 'relative',
  borderRadius: '5px',
  backgroundColor: '#EFEFEF',
  '&:hover': {
    backgroundColor: '#EFEFEF',
  },
  marginRight: props.theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: '183px',
  [props.theme.breakpoints.up('sm')]: {
    marginLeft: '50px',
    width: 'auto',
  },
  opacity: !props.disabled ? '1' : '0.25',
  pointerEvents: !props.disabled ? 'initial' : 'none',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
  '& .Mui-disabled': {
    userSelect: 'none',
  },
}));

export { Search, SearchIconWrapper, StyledInputBase };
