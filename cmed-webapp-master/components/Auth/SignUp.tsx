import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { upperFirst } from 'tiny-case';
import * as yup from 'yup';
import { useSignUpMutation } from '../../api/hooks/auth';
import { SignUpFormData } from '../../api/types/auth/auth';
import { useGlobalState } from '../../utilities/global-state';
import { Icons, SocialsIcons } from '../../utilities/icons';
import { signUpSchema } from '../../utilities/schemas';
import { DisabledWrapper } from '../QuickActionsMenu/DisabledWrapper';
import { AuthWrapper, Input, SocialButton, SubmitButton } from './styled';

export enum AccountTypeEnum {
  PATIENT = 'patient',
  DOCTOR = 'doctor',
  RESIDENT = 'resident',
}

const SignUp: FC = () => {
  const { mutate: onSignUpMutation, isLoading: isCreatingAccount } =
    useSignUpMutation();

  const [registerForm, setRegisterForm] = useState<SignUpFormData>({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    isActive: 1,
    profileImage: null,
    createdBy: 1,
    createdDate: new Date().toISOString(),
    isSystem: 1,
    isConfirmed: 1,
    accountType: AccountTypeEnum.PATIENT,
  });

  type FormData = yup.InferType<typeof signUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: FormData): void => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { passwordConfirm, email, ...other } = data;
    const requestData = {
      ...registerForm,
      ...other,
      username: email,
      email: email,
    };

    onSignUpMutation(requestData);
  };

  const accountTypeRadioOptions = [
    { id: 1, title: AccountTypeEnum.PATIENT },
    { id: 2, title: AccountTypeEnum.DOCTOR },
    { id: 3, title: AccountTypeEnum.RESIDENT },
  ];

  const [accountType, setAccountType] = useState(AccountTypeEnum.PATIENT);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAccountType(event.target.value as AccountTypeEnum);
    setRegisterForm({
      ...registerForm,
      accountType: event.target.value as AccountTypeEnum,
    });
  };

  const { authMethod, setIsAuthMethod } = useGlobalState();

  return (
    <AuthWrapper sx={authMethod.type === 'sign-up' ? { right: '0 !important' } : {}}>
      <Stack justifyContent={'space-between'} width={'100%'} height={'100%'}>
        <Box
          onClick={close}
          sx={{ position: 'absolute', top: '33px', left: '37px', cursor: 'pointer' }}
        >
          <Icons.IconClose />
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Typography textAlign={'center'} color={'primary'} variant={'h4'}>
              Sign Up
            </Typography>
            <Typography textAlign={'center'} color={'#818181'} variant={'h4'}>
              as
            </Typography>
            <RadioGroup
              onChange={handleChange}
              value={accountType}
              sx={{ flexDirection: 'row', justifyContent: 'center' }}
            >
              <Stack direction={'row'}>
                {accountTypeRadioOptions.map((cb) => (
                  <FormControlLabel
                    key={cb.id}
                    control={<Radio />}
                    value={cb.title}
                    label={upperFirst(cb.title)}
                  />
                ))}
              </Stack>
            </RadioGroup>
            <Stack py={4} spacing={'16px'}>
              <Stack spacing={'16px'} direction={'row'}>
                <Input
                  variant={'outlined'}
                  placeholder={'First Name'}
                  {...register('firstName')}
                  helperText={errors.firstName && errors?.firstName.message}
                  error={!!errors.firstName}
                />
                <Input
                  variant={'outlined'}
                  placeholder={'Last name'}
                  {...register('lastName')}
                  helperText={errors.lastName && errors?.lastName.message}
                  error={!!errors.lastName}
                />
              </Stack>
              <Input
                variant={'outlined'}
                placeholder={'Your email'}
                type={'email'}
                {...register('email')}
                helperText={errors.email && errors?.email.message}
                error={!!errors.email}
              />
              <Input
                variant={'outlined'}
                placeholder={'Create a strong password'}
                type={'password'}
                {...register('password')}
                helperText={errors.password && errors?.password.message}
                error={!!errors.password}
              />
              <Input
                variant={'outlined'}
                placeholder={'Confirm your password'}
                type={'password'}
                {...register('passwordConfirm')}
                helperText={
                  errors.passwordConfirm && errors?.passwordConfirm.message
                }
                error={!!errors.passwordConfirm}
              />
            </Stack>
            <Typography
              color={'#818181'}
              variant={'body2'}
              sx={{
                textAlign: 'center',
                margin: '10px 0 20px 0',
              }}
            >
              By signing up and using ClickMedicus, you agree to{' '}
              <Typography
                component={'span'}
                color={'secondary.dark'}
                variant={'body2'}
              >
                ClickMedicus terms & conditions
              </Typography>
            </Typography>
            <SubmitButton
              type={'submit'}
              disabled={isCreatingAccount}
              variant={'contained'}
              color={'primary'}
            >
              Create account
            </SubmitButton>
            <Stack
              direction={'row'}
              spacing={'4px'}
              justifyContent={'center'}
              margin={'10px 0 0 0'}
            >
              <Typography variant={'body1'}>Already have an account?</Typography>
              <Typography
                sx={{ cursor: 'pointer' }}
                id={'swap-sign-in'}
                onClick={() => {
                  setIsAuthMethod({ open: true, type: 'sign-in' });
                }}
                color={'primary'}
                variant={'body1'}
              >
                Sign In
              </Typography>
            </Stack>
          </Box>
        </form>

        <DisabledWrapper isDisabled>
          <Typography textAlign={'center'} color={'#818181'} variant={'body2'}>
            or Sign in with
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

export default SignUp;
