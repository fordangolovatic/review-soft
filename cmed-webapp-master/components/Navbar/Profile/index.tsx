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
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useCallback, useMemo, useState } from 'react';
import { useSignOut } from '../../../api/hooks/auth';
import { useMetadataQuery } from '../../../api/hooks/metadata';
import { getInitials } from '../../../utilities/functions';

export const ProfileMenu = () => {
  const { t } = useTranslation('common');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const { onLogout } = useSignOut();

  const { data: metadata, isLoading: isMetadataLoading } = useMetadataQuery();

  const [notifications] = useState(false);

  const onLogoutHandler = () => {
    window.location.replace('/');
    onLogout();
  };

  const menuItems = useMemo(
    () => [
      { id: 1, title: 'Profile', icon: SettingsOutlined, url: '/profile' },
      { id: 2, title: 'Help', icon: HelpOutlineOutlined, url: '/help' },
      {
        id: 3,
        title: 'Log out',
        icon: LogoutOutlined,
        url: '',
        fn: onLogoutHandler,
      },
    ],
    [onLogoutHandler],
  );

  const handleProfileMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [],
  );

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <Box>
      <Stack
        onClick={handleProfileMenuOpen}
        alignItems={'center'}
        spacing={'10px'}
        direction={'row'}
        sx={{ cursor: 'pointer' }}
      >
        <Badge
          color="primary"
          overlap={'circular'}
          variant="dot"
          invisible={notifications}
        >
          <Box
            width={40}
            display="flex"
            alignItems="center"
            justifyContent={'center'}
          >
            {isMetadataLoading ? (
              <Skeleton
                variant="circular"
                sx={{
                  width: { sm: '35px', xl: '40px' },
                  height: { sm: '35px', xl: '40px' },
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
                  width: { sm: '35px', xl: '40px' },
                  height: { sm: '35px', xl: '40px' },
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
        id={'navbar-profile__menu'}
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
        sx={{ mt: '10px' }}
      >
        {menuItems.map((item) => (
          <MenuItem
            onClick={
              item.fn
                ? () => {
                    handleMenuClose();
                    item.fn();
                  }
                : () => handleMenuClose()
            }
            key={item.id}
          >
            <Link href={item.url}>
              <Stack alignItems={'center'} direction={'row'} spacing={'8px'}>
                <Icon color={'secondary'}>
                  <item.icon />
                </Icon>
                <Typography variant={'body1'}>
                  {t(`b-${item.title.toLowerCase().replaceAll(' ', '')}`)}
                </Typography>
              </Stack>
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
