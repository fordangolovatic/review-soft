import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { boxWrapper, cardWrapper } from '../../styled/card';
import { ICardProps } from '../../types';

const Card: FC<ICardProps> = ({ data }) => {
  const { title, textTranslate } = data;
  const { t } = useTranslation('mti');
  return (
    <Box sx={boxWrapper} bgcolor={'background.paper'} flex={1}>
      <Stack spacing={'20px'} sx={cardWrapper}>
        <Typography variant={'h4'} color={'primary'}>
          {t(title)}
        </Typography>
        <Typography variant={'body1'}>{t(textTranslate)}</Typography>
      </Stack>
    </Box>
  );
};

export default Card;
