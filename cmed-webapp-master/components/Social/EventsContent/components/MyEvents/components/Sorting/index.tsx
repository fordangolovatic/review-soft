import { Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { SortBy, SortDepartment } from './components';

export const Sorting: FC = () => {
  const sortByOptions = [
    { label: 'Rating', value: 'Rating' },
    { label: 'None', value: 'None' },
  ];
  const sortDepartments = [
    { label: 'All', value: 'All' },
    { label: 'None', value: 'None' },
  ];
  const [, setSortBy] = useState('');
  const [, setDepartment] = useState('');

  return (
    <Stack spacing={'20px'} direction={'row'}>
      <Stack spacing={'10px'} alignItems={'center'} direction={'row'}>
        <Typography>Sort by</Typography>
        <SortBy sortByOptions={sortByOptions} onSortByChange={setSortBy} />
      </Stack>
      <Stack spacing={'10px'} alignItems={'center'} direction={'row'}>
        <Typography>Department</Typography>
        <SortDepartment
          departmentOptions={sortDepartments}
          onDepartmentChange={setDepartment}
        />
      </Stack>
    </Stack>
  );
};
