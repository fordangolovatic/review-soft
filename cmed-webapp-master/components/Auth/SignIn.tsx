import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Checkbox, Divider, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useSignInMutation } from '../../api/hooks/auth';
import { useGlobalState } from '../../utilities/global-state';
import { Icons, SocialsIcons } from '../../utilities/icons';
import { signInSchema } from '../../utilities/schemas';
import { DisabledWrapper } from '../QuickActionsMenu/DisabledWrapper';
import { AuthWrapper, Input, SocialButton, SubmitButton } from './styled';

const defaultSignInValues = {
  username: '',
  password: '',
  deviceName: '',
  operatingSystem: '',
  browserName: '',
  location: '',
  ipAddress: '',
  isForAdmin: true,
};

type FormData = yup.InferType<typeof signInSchema>;

const SignIn: FC = () => {
  const { authMethod, setIsAuthMethod } = useGlobalState();

  const { t } = useTranslation('common');

  const translation = {
    signIn: t('a-signIn'),
    signUp: t('a-signUp'),
    login: t('a-login'),
    forgot: t('a-forgot'),
    dontHaveAccount: t('a-dontHaveAccount'),
    rememberMe: t('a-rememberMe'),
  };

  const { mutate: loginMutation, isLoading: isLoggingIn } = useSignInMutation(
    authMethod.redirect,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = useCallback(
    (data: FormData): void => {
      const { email, password, remember = false } = data;
      const requestData = {
        ...defaultSignInValues,
        username: email,
        password,
        remember,
      };
      loginMutation(requestData);
    },
    [loginMutation],
  );

  return (
    <AuthWrapper sx={authMethod.type === 'sign-in' ? { right: '0 !important' } : {}}>
      <Stack justifyContent={'space-between'} width={'100%'} height={'100%'}>
        <Box
          onClick={() => {
            setIsAuthMethod({ ...authMethod, open: false });
          }}
          sx={{ position: 'absolute', top: '33px', left: '37px', cursor: 'pointer' }}
        >
          <Icons.IconClose />
        </Box>
        <Box>
          <Typography textAlign={'center'} color={'primary'} variant={'h4'}>
            {translation.signIn}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={'16px'} py={4}>
              <Input
                variant={'outlined'}
                helperText={errors.email && errors?.email.message}
                error={!!errors.email}
                placeholder={'Your email'}
                {...register('email')}
              />
              <Input
                variant={'outlined'}
                helperText={errors.password && errors?.password.message}
                error={!!errors.password}
                type={'password'}
                placeholder={'Enter your password'}
                {...register('password')}
              />
              <Stack direction={'row'} alignItems={'center'} gap={'4px'}>
                <Checkbox {...register('remember')} sx={{ padding: 0 }} />
                <Typography>{translation.rememberMe}</Typography>
              </Stack>
            </Stack>
            <SubmitButton
              type={'submit'}
              disabled={isLoggingIn}
              variant={'outlined'}
            >
              Log in
            </SubmitButton>
          </form>
          <Stack>
            <Stack
              direction={'row'}
              spacing={'4px'}
              justifyContent={'center'}
              margin={'10px 0 10px 0'}
            >
              <Typography variant={'body1'}>
                {translation.dontHaveAccount}
              </Typography>
              <Typography
                sx={{ cursor: 'pointer' }}
                onClick={() => {
                  setIsAuthMethod({
                    open: true,
                    type: 'sign-up',
                  });
                }}
                color={'primary'}
                variant={'body1'}
              >
                {translation.signUp}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <DisabledWrapper isDisabled>
          <Typography textAlign={'center'} color={'#818181'} variant={'body2'}>
            {`${t('o-as')} ${translation.signIn.toLowerCase()} ${t('o-with')}`}
          </Typography>
          <Divider sx={{ marginY: '14px' }} />
          <Stack direction={'row'} spacing={'8px'}>
            <SocialButton
              startIcon={<SocialsIcons.AuthGoogle />}
              variant={'outlined'}
            >
              Google
            </SocialButton>
            <SocialButton
              startIcon={<SocialsIcons.AuthFacebook />}
              variant={'outlined'}
            >
              Facebook
            </SocialButton>
          </Stack>
        </DisabledWrapper>
      </Stack>
    </AuthWrapper>
  );
};

export default SignIn;
