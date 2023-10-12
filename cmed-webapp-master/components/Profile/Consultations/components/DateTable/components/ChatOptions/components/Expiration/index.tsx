import { InputAdornment, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { FormState, UseFormRegister } from 'react-hook-form';
import { ChatOptionsFormData } from '../..';
import { ChatExpireField } from '../../../../styled';

interface ExpirationProps {
  register: UseFormRegister<ChatOptionsFormData>;
  formState: FormState<ChatOptionsFormData>;
}

const Expiration: FC<ExpirationProps> = ({ register, formState: { errors } }) => {
  const { t } = useTranslation('profile');

  return (
    <Stack gap={1}>
      <Typography variant={'body1'} color={'green'}>
        {t('c-chatExpire')}
      </Typography>

      <ChatExpireField
        id={'chat-expiration'}
        error={!!errors.expire}
        helperText={errors.expire && errors.expire?.message}
        type={'number'}
        InputProps={{
          disableUnderline: true,
          endAdornment: (
            <InputAdornment
              position={'start'}
              sx={{ paddingLeft: '10px', color: '#00534C' }}
            >
              <Typography>{t('c-chatExpireUnit')}</Typography>
            </InputAdornment>
          ),
        }}
        {...register('expire')}
      />
    </Stack>
  );
};

export default Expiration;
