import { ExpandLessOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useState } from 'react';

interface ISortProps {
  options: string[];
  onSelect: (selectedOption: string) => void;
}

const Sort = ({ options }: ISortProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const expandHandler = () => {
    setExpanded(!expanded);
  };
  return (
    <Stack direction={'row'} gap={'20px'}>
      <Typography color={'#818181'} variant={'body1'}>
        Sort by
      </Typography>

      <Stack direction={'row'} onClick={expandHandler} sx={{ cursor: 'pointer' }}>
        <Typography color={'#000'} variant={'body1'}>
          {options[0]}
        </Typography>

        {!expanded ? <ExpandMoreOutlined /> : <ExpandLessOutlined />}
      </Stack>
    </Stack>
  );
};

export default Sort;
