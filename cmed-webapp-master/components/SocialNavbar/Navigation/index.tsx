import {
  EmailOutlined,
  GroupOutlined,
  HomeOutlined,
  MedicationOutlined,
  NotificationsOutlined,
  StarOutlineOutlined,
} from '@mui/icons-material';
import { Box, useMediaQuery } from '@mui/material';
import { Stack } from '@mui/system';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import useCustomTheme from '../../../utilities/hooks/useTheme';
import { Icons } from '../../../utilities/icons';
import Notification from '../../Notification';
import { NavElement } from './components';

export const NavLinks = [
  {
    Icon: <HomeOutlined />,
    label: 'Home',
    path: '/social',
    strict: true,
  },
  {
    Icon: <GroupOutlined />,
    label: 'My Team',
    path: '/social/my-team',
  },
  {
    Icon: <StarOutlineOutlined />,
    label: 'Events',
    path: '/social/events',
  },
  {
    Icon: <MedicationOutlined />,
    label: 'Colleagues',
    path: '/social/colleagues',
  },
  {
    Icon: <EmailOutlined />,
    label: 'Messages',
    path: '/social/messages',
  },
  {
    render: (
      <Notification>
        <NavElement
          Icon={<NotificationsOutlined />}
          label={'Notifications'}
          active={false}
        />
      </Notification>
    ),
  },
];

const Navigation: FC = () => {
  const router = useRouter();
  const { theme } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenu, setMobileMenu] = useState<boolean>(false);
  return (
    <Stack height={'100%'} direction={'row'} sx={{ userSelect: 'none' }}>
      {isMobile && (
        <Box
          display={'flex'}
          alignContent={'center'}
          ml={'13px'}
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          <Icons.BurgerMenu />
        </Box>
      )}

      {(!isMobile || (isMobile && mobileMenu)) && (
        <Stack
          height={'100%'}
          direction={isMobile ? 'column' : 'row'}
          position={isMobile ? 'absolute' : 'initial'}
          sx={{
            left: { xs: '0' },
            width: { xs: '100%' },
            top: { xs: '110%' },
            background: { xs: 'white' },
            zIndex: { xs: 10 },
          }}
        >
          {NavLinks.map((link) =>
            link.path ? (
              <Link key={link.path} href={link.path} style={{ color: '#00534C' }}>
                <NavElement
                  Icon={link.Icon}
                  label={link.label}
                  active={
                    link.strict
                      ? router.pathname === link.path
                      : router.pathname.includes(link.path)
                  }
                />
              </Link>
            ) : (
              link.render
            ),
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default Navigation;
