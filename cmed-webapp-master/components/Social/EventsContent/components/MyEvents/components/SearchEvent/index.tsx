import SearchIcon from '@mui/icons-material/Search';
import { FC, useState } from 'react';
import { SearchField } from '../../../../../styled';

export const SearchEvent: FC = () => {
  const [search, setSearch] = useState('');

  return (
    <SearchField
      sx={{
        maxWidth: { sm: '210px', md: '240px', xl: '270px' },
      }}
      placeholder="Search events"
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      variant="outlined"
      InputProps={{
        startAdornment: <SearchIcon />,
      }}
    />
  );
};
