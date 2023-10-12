import {
  HelpOutlineOutlined,
  KeyboardArrowDownOutlined,
  KeyboardArrowUpOutlined,
  LogoutOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Badge,
  Box,
  Icon,
  Menu,
  MenuItem,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useCallback, useState } from 'react';
import { useSignOut } from '../../../api/hooks/auth';
import { useMetadataQuery } from '../../../api/hooks/metadata';
import { getInitials } from '../../../utilities/functions';

const Profile = () => {
  const router = useRouter();

  const { data: metadata, isLoading: isMetadataLoading } = useMetadataQuery();

  const [notifications] = useState(false);

  const { onLogout } = useSignOut();

  const menuItems = [
    { id: 1, title: 'Profile', icon: SettingsOutlined, url: '/profile' },
    { id: 2, title: 'Help', icon: HelpOutlineOutlined, url: '/help' },
    { id: 3, title: 'Log out', icon: LogoutOutlined, url: '', fn: onLogout },
  ];
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleRedirect = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleProfileMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  return (
    <Box>
      <Stack
        onClick={handleProfileMenuOpen}
        alignItems={'center'}
        spacing={'10px'}
        direction={'row'}
        p={{ sm: '13px 10px', xl: '20px 22px' }}
        sx={{ '&:hover': { backgroundColor: '#ECF5F4' }, cursor: 'pointer' }}
      >
        <Badge
          color="primary"
          overlap={'circular'}
          variant="dot"
          invisible={notifications}
        >
          <Box width={32}>
            {isMetadataLoading ? (
              <Skeleton
                variant={'circular'}
                sx={{
                  width: { sm: '40px', xl: '60px' },
                  height: { sm: '40px', xl: '60px' },
                  borderRadius: '50%',
                }}
              />
            ) : metadata?.profileImage ? (
              <Avatar
                srcSet={metadata.profileImage}
                sx={{ width: 32, height: 32 }}
              />
            ) : (
              <Box
                bgcolor={'#EFEFEF'}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{
                  width: { sm: '40px', xl: '60px' },
                  height: { sm: '40px', xl: '60px' },
                  borderRadius: '50%',
                }}
              >
                <Typography sx={{ userSelect: 'none' }}>
                  {getInitials(`${metadata?.firstName} ${metadata?.lastName}`)}
                </Typography>
              </Box>
            )}
          </Box>
        </Badge>
        <Icon>
          {!isMenuOpen ? <KeyboardArrowDownOutlined /> : <KeyboardArrowUpOutlined />}
        </Icon>
      </Stack>
      <Menu
        sx={{ mt: { sm: '50px', xl: '80px' } }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        id={'primary-search-account-menu'}
        keepMounted
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        {menuItems.map((item) => (
          <MenuItem
            onClick={
              item.fn
                ? () => {
                    handleMenuClose();
                    item.fn();
                    handleRedirect();
                  }
                : () => handleMenuClose
            }
            key={item.id}
          >
            <Link href={item.url}>
              <Stack alignItems={'center'} direction={'row'} spacing={'8px'}>
                <Icon color={'secondary'}>
                  <item.icon />
                </Icon>
                <Typography variant={'body1'}>{item.title}</Typography>
              </Stack>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default Profile;
