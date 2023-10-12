import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { FC, useState } from 'react';
import { SortingSelect } from '../../../../../../../styled';

type SortByOption = {
  label: string;
  value: string;
};

type SortByProps = {
  sortByOptions: SortByOption[];
  onSortByChange: (value: string) => void;
};

export const SortBy: FC<SortByProps> = ({ sortByOptions, onSortByChange }) => {
  const [sortBy, setSortBy] = useState(sortByOptions[0].value);

  const handleSortByChange = (event: SelectChangeEvent<unknown>): void => {
    const value = event.target.value as string;
    setSortBy(value);
    onSortByChange(value);
  };

  return (
    <FormControl>
      <SortingSelect
        labelId="sort-by-label"
        id="sort-by-select"
        value={sortBy}
        onChange={handleSortByChange}
        autoWidth
      >
        {sortByOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SortingSelect>
    </FormControl>
  );
};
