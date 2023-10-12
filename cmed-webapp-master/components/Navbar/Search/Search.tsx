import { Stack } from '@mui/material';
import React, { FC } from 'react';
import { Icons } from '../../../utilities/icons';

interface SearchProps {
  disabled?: boolean;
}

const Search: FC<SearchProps> = ({ disabled }) => {
  return (
    <Stack
      sx={{
        cursor: 'pointer',
        '&:hover svg path': { fill: '#00A04A' },
        '& svg': { width: { sm: '14px', xl: '20px' } },
        opacity: !disabled ? '1' : '0.25',
        pointerEvents: !disabled ? 'initial' : 'none',
      }}
    >
      <Icons.Search />
    </Stack>
  );
};

export default Search;
