import { Box, Button, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface INavigationProps {
  label: string;
  Icon: ReactNode;
  active?: boolean;
}
const NavElement = ({ label, Icon, active }: INavigationProps) => {
  return (
    <Stack
      height={'100%'}
      position={'relative'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        cursor: 'pointer',
        flexDirection: { xs: 'row', md: 'column' },
        justifyContent: { xs: 'flex-start', md: 'center' },
      }}
    >
      <Button
        focusRipple
        color={'inherit'}
        size={'large'}
        aria-label={label}
        variant={'text'}
        sx={{ height: '100%' }}
      >
        <Stack justifyContent={'center'} alignItems={'center'}>
          {Icon}
          <Typography
            sx={{
              color: {
                xs: active ? 'inherit' : '#000',
                md: active ? '#00A04A' : '#000',
              },
            }}
          >
            {label}
          </Typography>
        </Stack>
      </Button>

      {active && (
        <Box
          width={'100%'}
          height={'2px'}
          position={'absolute'}
          bottom={0}
          padding={'0px 2px'}
          sx={{ background: '#00534C', display: { xs: 'none', md: 'initial' } }}
        />
      )}
    </Stack>
  );
};

export default NavElement;
