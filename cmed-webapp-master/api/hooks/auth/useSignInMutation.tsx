import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useToast } from '../../../utilities/hooks/useToast';
import authApi from '../../service/auth/authApi';
import { SignInFormData, SignInResponse } from '../../types/auth/auth';

export const useSignInMutation = (
  redirect?: string,
  options?: UseMutationOptions<unknown, unknown, unknown>,
) => {
  const { notifyError } = useToast();
  const { signIn } = authApi();

  return useMutation(
    ['signInMutation'],
    async (loginData: SignInFormData) => {
      try {
        const { data } = await signIn(loginData);
        return data;
      } catch (error: any) {
        notifyError(
          error.response ? error.response.data.messages[0].errors[0] : error.message,
        );
      }
      // return signIn(loginData)
      //   .then((response) => {
      //     return response.data as SignInResponse;
      //   })
      //   .catch((error) => {
      //     notifyError(error.message);
      //   });
    },
    {
      ...options,
      onSuccess: (response?: SignInResponse) => {
        if (response?.accessToken) {
          window.localStorage.setItem('accessToken', response.accessToken);
          window.localStorage.setItem('refreshToken', response.refreshToken);
          window.location.replace(redirect ?? '/');
        }
      },
      // onError: () => {
      //   notifyError('Something went wrong. Please try again.');
      // },
    },
  );
};
