import { SearchOutlined } from '@mui/icons-material';
import { Card, Divider, InputAdornment, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import Collegue from '../Collegue';
import Requests from '../Requests';
import { Input } from '../styled';

const Conversations: FC = () => {
  return (
    <Card
      variant={'outlined'}
      sx={{ height: { xs: '100%', md: 'min-content', padding: '20px' } }}
    >
      <Stack
        width={'100%'}
        gap={'20px'}
        divider={<Divider orientation={'horizontal'} color={'#EFEFEF'} />}
      >
        <Stack width={'100%'} gap={'40px'}>
          <Typography variant={'body1'} color={'#00A04A'}>
            All Colleagues
          </Typography>

          <Input
            placeholder="Search"
            variant={'standard'}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment
                  position={'start'}
                  sx={{ paddingLeft: '10px', color: '#00534C' }}
                >
                  <SearchOutlined color={'inherit'} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Collegue />

        <Requests />
      </Stack>
    </Card>
  );
};

export default Conversations;
