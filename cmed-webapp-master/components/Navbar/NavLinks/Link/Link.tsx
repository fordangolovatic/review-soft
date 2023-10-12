import { Box, Button, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { FC, useState } from 'react';
import { NavLink } from '../../../../api/types/account/messages/works';
import { Icons } from '../../../../utilities/icons';

interface NavLinkProps {
  link: NavLink;
  navLength: number;
}

const ButtonLink: FC<any> = ({ children, link, handleClick, open }) =>
  !link?.submenu ? (
    <Link href={link.href}>{children}</Link>
  ) : (
    <Button
      sx={{
        padding: '0px',
        '& .MuiTouchRipple-root': {
          display: 'none',
        },
      }}
      id={'basic-menu'}
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
      variant={'text'}
    >
      {children}
    </Button>
  );

const NavLink = ({ link, navLength }: NavLinkProps) => {
  const { t } = useTranslation('common');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <ButtonLink handleClick={handleClick} open={open} link={link}>
        <Stack
          sx={{
            '&:hover h5': { color: '#00A04A' },
            '&:hover svg path': { stroke: '#00A04A' },
          }}
          alignItems={'center'}
          gap={'4px'}
          flexDirection={'row'}
        >
          <Typography
            color={navLength === link.id ? '#DA2C38' : '#000'}
            letterSpacing={'0.04px'}
            variant="body1"
            component={'h5'}
          >
            {t(`h-${link.translationKey}`)}
            {/*{t(`h-${link.translationKey.replaceAll(' ', '')}`)}*/}
          </Typography>
          {link.submenu && (
            <Box
              sx={{
                display: 'flex',
                '& svg path': {
                  stroke: anchorEl ? '#00A04A' : '#000',
                },
              }}
            >
              <Icons.ArrowLink />
            </Box>
          )}
        </Stack>
      </ButtonLink>
      {link.submenu && (
        <Box>
          <Menu
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {link.submenu.map((subLink) => (
              <MenuItem
                key={subLink.id}
                id={'basic-menu'}
                onClick={handleClose}
                sx={{ '&:hover h5': { color: '#00A04A' } }}
              >
                <Link href={subLink.href}>
                  <Typography
                    color={'#000'}
                    letterSpacing={'0.04px'}
                    variant="body1"
                    component={'h5'}
                  >
                    {t(`h-${subLink?.translationKey}`)}
                  </Typography>
                </Link>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default NavLink;
