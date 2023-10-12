import { Box, Stack, styled, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { FC } from 'react';
import { KeepCard } from '../../../api/types/account/messages/works';
import { Keep as KeepCards } from '../../../utilities/data';
import { Icons } from '../../../utilities/icons';
import { CustomContainer } from '../../MuiCustom';

const Card = styled(Box)(() => ({
  position: 'relative',
  backgroundColor: 'white',
  flex: '1',
  borderRadius: '30px',
  overflow: 'hidden',
  height: '100%',
  transform: 'scale(1)',
  paddingBottom: '27px',
  '& img': {
    transition: 'all 0.4s ease-in-out',
    width: '100%',
    height: '100%',
    zIndex: '0',
    objectFit: 'cover',
  },
  '&:hover img': {
    transform: 'scale(1.06)',
  },
  '& svg': {
    transition: 'all 0.4s ease-in-out',
    transform: 'rotate(0deg)',
  },
  '&:hover svg': {
    transform: 'rotate(-180deg)',
  },
}));
const KeepInformed: FC = () => {
  const { t } = useTranslation('homePage');
  const cards: KeepCard[] = KeepCards;
  return (
    <CustomContainer>
      <Box width={'100%'}>
        <Stack
          alignItems={'center'}
          direction={'column'}
          padding={{ xs: '55px 0 18px 0', sm: '55px 0px 100px 0px' }}
        >
          <Typography
            color={'secondary.dark'}
            pb={'8px'}
            variant={'h2'}
            textAlign={'center'}
          >
            {t('keepTitle')}
          </Typography>
          <Box width={'100%'} pt={'36px'}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={'2px'}>
              {cards.map(({ id, img, title, body, url }) => (
                <Card key={id} sx={{}}>
                  <Box
                    sx={{
                      overflow: 'hidden',
                      height: '212px',
                      borderRadius: '30px',
                    }}
                  >
                    <img width={'100%'} src={img} alt={title} />
                  </Box>
                  <Box
                    position={'absolute'}
                    width={{ xs: '18px', xl: '24px' }}
                    height={{ xs: '18px', xl: '24px' }}
                    top={'30px'}
                    right={'30px'}
                  >
                    <Icons.ArrowDepartment />
                  </Box>
                  <Box p={'8px 0px 0 18px'}>
                    <Typography color={'secondary.dark'} pb={'6px'} variant={'h5'}>
                      {t(`keep${title}`)}
                      {/*{t(`keep${title.replaceAll(' ', '')}`)}*/}
                    </Typography>
                    <Typography mb={'7px'} width={'170px'} variant={'body2'}>
                      {body}
                    </Typography>
                    <Link className="underline" href={`/${url}`}>
                      <Typography color={'primary'} width={'100%'} variant={'body1'}>
                        {t('common:b-readMore')}
                      </Typography>
                    </Link>
                  </Box>
                </Card>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </CustomContainer>
  );
};

export default KeepInformed;
