import {
  ContactsOutlined,
  Groups2Outlined,
  StarOutline,
  VideoCameraBackOutlined,
} from '@mui/icons-material';
import { Card, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

const Tabs = [
  {
    label: 'Contacts',
    Icon: <ContactsOutlined color={'inherit'} />,
    path: 'contacts',
  },
  {
    label: 'Events',
    Icon: <StarOutline color={'inherit'} />,
    path: 'events',
  },
  {
    label: 'Team',
    Icon: <Groups2Outlined color={'inherit'} />,
    path: 'team',
  },
  {
    label: 'Meeting',
    Icon: <VideoCameraBackOutlined color={'inherit'} />,
    path: 'meeting',
  },
];

const TeamTabs: FC = () => {
  const router = useRouter();
  return (
    <Card variant={'outlined'} sx={{ height: { xs: '100%', md: 'min-content' } }}>
      <Stack padding={'20px'} gap={'25px'} paddingRight={'50px'}>
        <Typography variant={'body1'}>Contacts</Typography>

        {Tabs.map((tab) => (
          <Link
            key={tab.path}
            href={`/social/my-team/${tab.path}`}
            style={{ color: '#00534C' }}
          >
            <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
              {tab.Icon}
              <Typography
                color={
                  router.pathname.includes(`/social/my-team/${tab.path}`)
                    ? '#00A04A'
                    : '#818181'
                }
              >
                {tab.label}
              </Typography>
            </Stack>
          </Link>
        ))}
      </Stack>
    </Card>
  );
};

export default TeamTabs;
