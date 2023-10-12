import { Divider, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { conversations } from '../data';
import Element from './Element';

const Collegue: FC = () => {
  return (
    <Stack gap={'20px'}>
      <Typography variant={'body1'} color={'#00A04A'}>
        {conversations.length} Collegues
      </Typography>

      <Stack divider={<Divider orientation={'horizontal'} color={'#EFEFEF'} />}>
        {conversations.map((conversation) => (
          <Element
            key={conversation.id}
            id={conversation.id}
            avatar={conversation.avatar}
            name={conversation.name}
            role={conversation.role}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Collegue;
