import { Box, Stack, styled, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useState } from 'react';
import { WorksSteps } from '../../../../api/types/account/messages/works';

interface CardsProps {
  steps: WorksSteps[];
  stepId: number;
}
const Card = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    minHeight: '169px',
  },
  [theme.breakpoints.up('md')]: {
    height: '251px',
  },
  [theme.breakpoints.up('xl')]: {
    height: '378px',
  },
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
  backgroundColor: 'gray',
  borderRadius: '20px',
  overflow: 'hidden',
  position: 'relative',
  '& img': {
    filter: 'brightness(0.7)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: '0',
    objectFit: 'cover',
  },
}));
const Overlay = styled(Box)(({ theme }) => ({
  flex: '1',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  color: 'white',
  zIndex: '1',
  width: '100%',
  height: '100%',
  position: 'relative',
  transition: 'all .9s',
  [theme.breakpoints.up('xs')]: {
    padding: '20px',
  },
  [theme.breakpoints.up('sm')]: {
    padding: '20px',
  },
  [theme.breakpoints.up('xl')]: {
    padding: '40px',
  },
  '& .MuiBox-root': {
    transition: 'all .6s',
  },
  '&:hover': {
    '& .MuiTypography-body2': {
      paddingTop: '8px',
      opacity: '1',
    },
    '& .MuiBox-root': {
      transform: 'translateY(0)',
    },
  },
  '& .MuiTypography-body2': {
    opacity: '0',
    transition: 'all 0.8s',
  },
}));
const Cards: FC<CardsProps> = ({ steps, stepId }) => {
  const [cardActive, setCardActive] = useState(5);
  const { t } = useTranslation('homePage');
  return (
    <Box width={'100%'}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={'4px'}>
        {steps.map((step) => (
          <Card
            key={step.id}
            onClick={() => setCardActive(step.id)}
            sx={{ flex: step.id === cardActive ? '1.7' : '1' }}
          >
            <img src={step.img} alt={'card'} />
            <Overlay
              sx={{
                background: step.overlay,
                '&:hover': { background: step.hoverOverlay },
              }}
            >
              <Typography variant={'subtitle1'}>{step.step}.</Typography>
              <Box
                sx={{
                  transform: {
                    xs: 'translateY(calc(100% - 20px))',
                    sm: 'translateY(calc(100% - 45px))',
                  },
                }}
              >
                <Typography
                  sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    height: '46px',
                  }}
                  variant={'subtitle1'}
                >
                  {t(`${stepId}n${step.step}Title`)}
                </Typography>
                <Typography variant={'body2'}>
                  {t(`${stepId}n${step.step}Text`)}
                </Typography>
              </Box>
            </Overlay>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Cards;
