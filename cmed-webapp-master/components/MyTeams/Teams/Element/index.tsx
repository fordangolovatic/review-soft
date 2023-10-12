import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

interface ElementProps {
  id: string;
  name: string;
  userCount: number;
  role: string;
  editAccess?: boolean;
  banner: string;
}

const Element: FC<ElementProps> = ({
  id,
  name,
  userCount,
  banner,
  role,
  editAccess,
}: ElementProps) => {
  const getTagColor = () => {
    switch (role.toLowerCase().split(' ')[1]) {
      case 'creator':
        return '#00A04A';

      case 'manager':
        return '#00534C';

      default:
        return '#818181';
    }
  };
  return (
    <Grid item width={{ xs: '100%', md: 'auto' }} xs={'auto'}>
      <Stack width={'100%'} gap={'15px'}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Typography variant={'body1'}>{name}</Typography>
          <Typography variant={'body2'} color={'#818181'}>
            {userCount} users
          </Typography>
        </Stack>

        <Box position={'relative'} height={'120px'}>
          <Image src={banner} alt={name} fill style={{ objectFit: 'cover' }} />
          <Box
            position={'absolute'}
            top={'15px'}
            right={'10px'}
            bgcolor={getTagColor()}
            px={'15px'}
            py={'5px'}
            borderRadius={'100px'}
          >
            <Typography variant={'body2'} color={'#FFF'}>
              {role}
            </Typography>
          </Box>
        </Box>

        <Stack direction={'row'} justifyContent={'space-between'} gap={'20px'}>
          <Link href={`/social/my-team/team/${id}`}>
            <Button variant={'contained'} color={'secondary'}>
              Show team
            </Button>
          </Link>
          {editAccess && (
            <Button variant={'contained'} color={'darkGreen'}>
              Edit
            </Button>
          )}
        </Stack>
      </Stack>
    </Grid>
  );
};

export default Element;
