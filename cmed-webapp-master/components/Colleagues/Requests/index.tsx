import { Divider, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import Element from '../Collegue/Element';
import { requests } from '../data';

const Requests: FC = () => {
  return (
    <Stack gap={'20px'}>
      <Typography variant={'body1'} color={'#00A04A'}>
        {requests.length} Request Colleagues
      </Typography>

      <Stack divider={<Divider orientation={'horizontal'} color={'#EFEFEF'} />}>
        {requests.map((request) => (
          <Element
            key={request.id}
            id={request.id}
            avatar={request.avatar}
            name={request.name}
            role={request.role}
            isRequest
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Requests;
