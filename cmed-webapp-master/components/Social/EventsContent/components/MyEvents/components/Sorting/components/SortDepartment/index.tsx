import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { FC, useState } from 'react';
import { SortingSelect } from '../../../../../../../styled';

type DepartmentsOption = {
  label: string;
  value: string;
};
type DepartmentsProps = {
  departmentOptions: DepartmentsOption[];
  onDepartmentChange: (value: string) => void;
};
export const SortDepartment: FC<DepartmentsProps> = ({
  departmentOptions,
  onDepartmentChange,
}) => {
  const [department, setDepartment] = useState(departmentOptions[0].value);

  const handleDepartmentChange = (event: SelectChangeEvent<unknown>): void => {
    const value = event.target.value as string;
    setDepartment(value);
    onDepartmentChange(value);
  };

  return (
    <FormControl>
      <SortingSelect
        variant={'outlined'}
        labelId="departments-label"
        id="departments-select"
        value={department}
        defaultValue={departmentOptions[0]}
        onChange={handleDepartmentChange}
        autoWidth
      >
        {departmentOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </SortingSelect>
    </FormControl>
  );
};
