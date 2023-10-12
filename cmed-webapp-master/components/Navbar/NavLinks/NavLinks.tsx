import { Box, Stack, styled } from '@mui/material';
import React, { FC } from 'react';
import { NavLink } from '../../../api/types/account/messages/works';
import Search from '../Search/Search';
import Link from './Link/Link';

const CustomStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end',
  [theme.breakpoints.up('xs')]: {},
  [theme.breakpoints.up('sm')]: {
    gap: '20px',
  },
  [theme.breakpoints.up('md')]: {},
  [theme.breakpoints.up('xl')]: {
    gap: '28px',
  },
}));

const NavLinks: FC = () => {
  const navLinks: NavLink[] = [
    {
      id: 1,
      translationKey: 'doctors',
      title: 'Doctors',
      href: '/doctors',
    },
    {
      id: 2,
      translationKey: 'mti',
      title: 'MTI',
      href: '/mti',
    },
    {
      id: 3,
      translationKey: 'askDoctor',
      title: 'Ask a doctor',
      href: '/ask-doctor',
    },
    {
      id: 4,
      translationKey: 'ourBlog',
      title: 'Our Blog',
      href: '/our-blog',
      submenu: [
        {
          id: 1,
          translationKey: 'articles',
          title: 'Articles',
          href: '/articles',
        },
        {
          id: 2,
          translationKey: 'medicalArticles',
          title: 'Medicinal Articles',
          href: '/medical-articles',
        },
        { id: 3, translationKey: 'news', title: 'News', href: '/news' },
      ],
    },
  ];
  return (
    <Box display={{ xs: 'none', sm: 'block' }} flexGrow={1}>
      <CustomStack>
        {navLinks.map((link) => (
          <Box key={link.id} id={`navlink-${link.translationKey}`}>
            <Link navLength={navLinks.length} link={link} />
          </Box>
        ))}
        <Search disabled />
      </CustomStack>
    </Box>
  );
};

export default NavLinks;
