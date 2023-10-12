import { Box, Button, Checkbox, Stack, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTranslation } from 'next-i18next';
import React, { FC, useState } from 'react';

const Anamnes: FC = () => {
  const { t } = useTranslation('common');
  const [allow, setAllow] = useState(false);
  const termsSplit = t('allowTermsAndPolicy').split(':&');
  return (
    <Stack flex={1} spacing={'10px'}>
      <Stack>
        <Typography variant={'subtitle1'}>{t('anamnes')}</Typography>
        <Typography variant={'body1'} color={'secondary'}>
          {t('anamnesDescription')}
        </Typography>
      </Stack>
      <Stack spacing={'20px'} direction={'row'}>
        <Stack width={'100%'} spacing={'10px'}>
          <Stack alignItems={'center'} direction={'row'} spacing={'3px'}>
            <Box>
              <Checkbox
                sx={{
                  padding: '0px',
                  transform: 'translateX(-2px)',
                  '&:hover': { bgcolor: 'transparent' },
                }}
                color={'secondary'}
                disableRipple
                checked={allow}
                onChange={() => setAllow(!allow)}
              />
            </Box>
            <Typography>{t('allowMedicalRecord')}</Typography>
          </Stack>
          <TextField
            sx={{ background: '#EFEFEF' }}
            rows={5}
            multiline
            color={'secondary'}
          />
        </Stack>
        <Stack spacing={'10px'} maxWidth={'200px'} width={'100%'}>
          <Stack minHeight={'24px'} alignItems={'center'} direction={'row'}>
            <Typography>{t('dndImageTitle')}</Typography>
          </Stack>
          <Box
            sx={{
              cursor: 'pointer',
              padding: '15px',
              height: '100%',
              border: `1px solid ${grey[600]}`,
              borderRadius: '5px',
              background: '#EFEFEF',
            }}
          >
            <Stack height={'100%'} justifyContent={'space-between'}>
              <Typography textAlign={'center'} variant={'body1'}>
                {t('dndImageDescription')}
              </Typography>
              <Typography
                color={'secondary.dark'}
                textAlign={'center'}
                variant={'body1'}
              >
                {t('dndImageUploaded')} 0 / 5
              </Typography>
            </Stack>
          </Box>
        </Stack>
      </Stack>
      <Stack spacing={'10px'} alignItems={'flex-end'}>
        <Stack>
          <Typography textAlign={'end'} color={grey[500]}>
            {termsSplit[0]}{' '}
            <Typography component={'span'} color={'secondary'}>
              {termsSplit[1]}{' '}
            </Typography>
            {termsSplit[2]}{' '}
            <Typography component={'span'} color={'secondary'}>
              {termsSplit[3]}
            </Typography>
          </Typography>
        </Stack>
        <Box>
          <Button
            sx={{
              padding: '10px 35px',
            }}
            color={'secondary'}
            variant={'contained'}
          >
            {t('joinRoomWait')}
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Anamnes;
