import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useState } from 'react';

import { EcosystemCards } from '../../../api/types/account/messages/works';
import { defaultEcosystemCardValues } from '../../../utilities/data';
import useCustomTheme from '../../../utilities/hooks/useTheme';
import { CustomContainer } from '../../MuiCustom';

const Card = styled(Box)(() => ({
  flex: '1',
  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.07)',
  borderRadius: '30px',
  transition: 'transform 0.4s',
  '&:hover': {
    transform: 'translateY(-10px)',
  },
}));
const Ecosystem: FC = () => {
  const { theme } = useCustomTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [slide, setSlide] = useState(2);
  const { t } = useTranslation('homePage');
  useEffect(() => {
    mobile &&
      setTimeout(() => {
        setSlide((prev) => (prev === 3 ? 1 : prev + 1));
      }, 5000);
  }, [slide, mobile]);
  const slideBreakpoints = [
    { id: 1, breakpoint: '296px' },
    { id: 2, breakpoint: '0px' },
    { id: 3, breakpoint: '-296px' },
  ];

  const cards: EcosystemCards[] = defaultEcosystemCardValues;
  return (
    <CustomContainer
      sx={{
        [theme.breakpoints.down('sm')]: {
          padding: '0',
        },
      }}
    >
      <Box pb={{ xs: '71px' }}>
        <Stack
          pt={{ xs: '48px', xl: '83px' }}
          alignItems={'center'}
          sx={{
            [theme.breakpoints.down('sm')]: {
              overflow: 'hidden',
            },
          }}
        >
          <Typography
            color={'secondary.dark'}
            sx={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}
            variant={'h2'}
          >
            {t('ecoTitle')}
          </Typography>
          <Box maxWidth={{ sm: '100%' }} mt={{ xs: '27px', xl: '78px' }}>
            <Stack
              sx={
                mobile
                  ? {
                      transform: `translateX(${
                        slideBreakpoints[slide - 1].breakpoint
                      })`,
                      transition: 'all .5s',
                    }
                  : {}
              }
              direction={'row'}
              spacing={{ xs: '4px', sm: '12px', xl: '40px' }}
            >
              {cards.map(({ id, title, list }) => (
                <Card
                  onClick={() => setSlide(id)}
                  key={id}
                  width={{ xs: '296px', sm: '100%' }}
                  padding={{ xs: '30px 20px', xl: '40px 45px' }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography
                    color={'secondary.dark'}
                    mb={{ xs: '19px', xl: '28px' }}
                    variant={'h4'}
                  >
                    {t(title)}
                    {/*{t(title.toLowerCase().replaceAll(' ', ''))}*/}
                  </Typography>
                  {/* <Typography mb={{ xs: '19px', xl: '28px' }} variant={'body1'}>
                    {t(introduction)}
                  </Typography> */}
                  <Grid container spacing={'16px'}>
                    {list.map((item, i) => (
                      <Grid key={+new Date() + i} item>
                        <Typography
                          sx={{
                            position: 'relative',
                            '&:after': {
                              content: '""',
                              position: 'absolute',
                              width: '8px',
                              height: '8px',
                              borderRadius: '100px',
                              left: '-20px',
                              background: '#DA2C38',
                              top: { sm: '4px', xl: '13px' },
                            },
                          }}
                          ml={'20px'}
                          variant={'body1'}
                        >
                          {item}
                        </Typography>
                      </Grid>
                    ))}
                  </Grid>
                  {/* <Typography
                    mb={{ xs: '19px', xl: '28px', paddingTop: 16 }}
                    variant={'body1'}
                  >
                    {t(conclusion)}
                  </Typography> */}
                  <Button
                    disabled
                    sx={{
                      padding: { xs: '20px 0', sm: '13px 0', xl: '19px 0' },
                      width: '100%',
                      mt: { xs: '18px', xl: '40px' },
                    }}
                    variant={'outlined'}
                  >
                    {t('common:getStarted')}
                  </Button>
                </Card>
              ))}
            </Stack>
          </Box>
          {mobile && (
            <Stack spacing={'10px'} mt={'40px'} direction={'row'}>
              {cards.map((dot) => (
                <Box
                  key={dot.id}
                  onClick={() => setSlide(dot.id)}
                  bgcolor={slide === dot.id ? 'secondary.dark' : 'transparent'}
                  border={'1px solid gray'}
                  width={'10px'}
                  height={'10px'}
                  borderRadius={'50px'}
                />
              ))}
            </Stack>
          )}
        </Stack>
      </Box>
    </CustomContainer>
  );
};

export default Ecosystem;
