import { SearchOutlined } from '@mui/icons-material';
import React, { FC } from 'react';
import { Search, SearchIconWrapper, StyledInputBase } from '../styled';

interface SearchInputProps {
  disabled?: boolean;
}

const SearchInput: FC<SearchInputProps> = ({ disabled }) => {
  return (
    <Search disabled={disabled}>
      <SearchIconWrapper>
        <SearchOutlined sx={{ color: '#818181' }} />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        disabled={disabled}
        inputProps={{ 'aria-label': 'search' }}
      />
    </Search>
  );
};

export default SearchInput;
