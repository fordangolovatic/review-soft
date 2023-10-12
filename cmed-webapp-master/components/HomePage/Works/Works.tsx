import { Box, Button, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useState } from 'react';
import { WorksCards } from '../../../api/types/account/messages/works';
import { defaultWorksCardValues } from '../../../utilities/data';
import { CustomContainer } from '../../MuiCustom';
import Cards from './Cards/Cards';
import Category from './Category/Category';

const Works: FC = () => {
  const { t } = useTranslation('homePage');
  const cards: WorksCards[] = defaultWorksCardValues;
  const [category, setCategory] = useState<number>(1);
  const selectedCategory: WorksCards = cards.filter(
    (card) => card.id === category,
  )[0];
  const onSetCategory = (id: number): void => {
    setCategory(id);
  };
  return (
    <CustomContainer>
      <Box padding={{ xs: '40px 0 65px 0', sm: '53px 0 75px 0px' }}>
        <Stack alignItems={'center'} direction="column">
          <Typography color={'secondary.dark'} variant={'h2'}>
            {t('worksTitle')}
          </Typography>
          <Typography
            sx={{
              margin: { xs: '10px 0 20px 0', sm: '5px 0 0 0' },
              maxWidth: { xs: '350px', sm: '576px', xl: '745px' },
              textAlign: 'center',
              whiteSpace: 'pre-wrap',
            }}
            variant="subtitle1"
          >
            {t('worksSubtitle')}
          </Typography>
          <Category selected={category} onClick={onSetCategory} />
          <Cards stepId={category} steps={selectedCategory.steps} />
          <br />
          <br />
          <Typography
            color={'secondary.dark'}
            sx={{ whiteSpace: 'pre-wrap', textAlign: 'center' }}
            variant={'h4'}
          >
            {t('worksTitleSub')}
          </Typography>

          <Button
            disabled
            sx={{
              mt: { xs: '20px', sm: '35px', xl: '58px' },
              padding: { xs: '20px 74px', sm: '13px 40.5px', xl: '20px 64px' },
            }}
            variant={'outlined'}
          >
            {t('common:bookYourAppointment')}
          </Button>
        </Stack>
      </Box>
    </CustomContainer>
  );
};

export default Works;
