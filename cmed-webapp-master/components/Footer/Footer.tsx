import { Box, Stack, Typography, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import React, { FC } from 'react';
import useCustomTheme from '../../utilities/hooks/useTheme';
import { Icons, SocialsIcons } from '../../utilities/icons';
import { CustomContainer } from '../MuiCustom';

const Footer: FC = () => {
  const { theme } = useCustomTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navLinks = [
    {
      id: 1,
      title: 'Product',
      items: [
        { id: 1, url: '/doctors', title: 'Doctors' },
        // { id: 2, url: '/analysis', title: 'Analysis' },
        // { id: 3, url: '/for-patients', title: 'For patients' },
        // { id: 4, url: '/for-doctors', title: 'For doctors' },
        // { id: 5, url: '/for-residents', title: 'For residents' },
      ],
    },
    {
      id: 2,
      title: 'Portal',
      items: [
        { id: 1, url: '/articles', title: 'Articles' },
        { id: 2, url: '/news', title: 'News' },
        { id: 3, url: '/medical-articles', title: 'Medical Articles' },
        // { id: 4, url: '/forum', title: 'Forum' },
      ],
    },
    {
      id: 3,
      title: 'Company',
      items: [
        { id: 1, url: '/about', title: 'About us' },
        { id: 2, url: '/help', title: 'Help' },
        { id: 3, url: '/contacts', title: 'Contacts' },
      ],
    },
    {
      id: 4,
      title: 'Polices',
      items: [
        { id: 1, url: '/privacy', title: 'Privacy' },
        { id: 2, url: '/terms', title: 'Terms of use' },
      ],
    },
  ];
  return (
    <Box m={'63px 0 68px 0'}>
      <CustomContainer>
        <Stack
          justifyContent={{ xs: 'center', sm: 'inherit' }}
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ md: '195px' }}
        >
          <Box>
            <Stack alignItems={{ xs: 'center', sm: 'inherit' }} spacing={'22px'}>
              <Stack
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                maxWidth={'300px'}
                width={'100%'}
              >
                <Box width={'147px'}>
                  <Icons.Logo />
                </Box>
                {mobile && (
                  <Stack
                    direction={'row'}
                    spacing={'10px'}
                    sx={{ '& svg': { width: '23px' } }}
                  >
                    <SocialsIcons.FaceBook />
                    <SocialsIcons.Linkedin />
                    <SocialsIcons.Telegram />
                  </Stack>
                )}
              </Stack>
              <Stack alignItems={{ xs: 'center', sm: 'inherit' }} spacing={'15px'}>
                <Stack direction={'row'} spacing={'4px'}>
                  <Icons.Global />
                  <Typography color={'secondary.dark'} variant="body1">
                    English (Eng)
                  </Typography>
                </Stack>
                <Typography color={'secondary.dark'} variant="body1">
                  info@clickmedicus.com
                </Typography>
              </Stack>
              {!mobile && (
                <Stack
                  direction={'row'}
                  spacing={'10px'}
                  sx={{ '& svg': { width: '23px' } }}
                >
                  <SocialsIcons.FaceBook />
                  <SocialsIcons.Linkedin />
                  <SocialsIcons.Instagram />
                </Stack>
              )}
            </Stack>
          </Box>
          <Stack display={{ sm: 'flex' }} flex={1}>
            <Stack
              display={{ xs: 'none', sm: 'flex' }}
              direction={'row'}
              justifyContent={'space-between'}
              pt={'15px'}
            >
              {navLinks.map((category) => (
                <Stack key={category.id} spacing={'20px'}>
                  <Typography color={'secondary.dark'} variant={'h5'}>
                    {category.title}
                  </Typography>
                  <Stack spacing={'12px'}>
                    {category.items.map((link) => (
                      <Link href={link.url} key={link.id}>
                        <Typography color={'secondary.dark'} variant={'body1'}>
                          {link.title}
                        </Typography>
                      </Link>
                    ))}
                  </Stack>
                </Stack>
              ))}
            </Stack>
            <Typography
              variant={'body1'}
              pt={{ xs: '20px', sm: '56px' }}
              textAlign={{ xs: 'center', sm: 'end' }}
              color={'secondary.dark'}
            >
              Copyright © 2022, ClickMedicus. All rights reserved.
            </Typography>
          </Stack>
        </Stack>
      </CustomContainer>
    </Box>
  );
};

export default Footer;
