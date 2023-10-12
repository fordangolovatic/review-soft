import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { teams } from './data';
import Element from './Element';

const Teams: FC = () => {
  return (
    <Card variant={'outlined'}>
      <Stack padding={'20px'} gap={'20px'}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'flex-end'}
          color={'#00A04A'}
        >
          <Typography variant={'h4'} color={'#000'}>
            My teams
          </Typography>

          <Button
            color={'inherit'}
            variant={'outlined'}
            sx={{ borderRadius: '30px', height: '100%' }}
          >
            Add team
          </Button>
        </Stack>

        {teams && (
          <Box
            display={'grid'}
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
            gap={2}
          >
            {teams.map((team) => (
              <Element
                key={team.id}
                id={team.id}
                name={team.name}
                role={team.role}
                userCount={team.userCount}
                banner={team.banner}
                editAccess={team.editAccess}
              />
            ))}
          </Box>
        )}
      </Stack>
    </Card>
  );
};

export default Teams;
