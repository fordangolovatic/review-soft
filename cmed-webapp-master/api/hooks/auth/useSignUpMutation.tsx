import { useMutation } from '@tanstack/react-query';
import { useToast } from '../../../utilities/hooks/useToast';
import authApi from '../../service/auth/authApi';
import { SignUpFormData } from '../../types/auth/auth';

export const useSignUpMutation = () => {
  const { notifyError, notifySuccess } = useToast();

  const { signUp } = authApi();

  return useMutation(
    async (signUpData: SignUpFormData) => {
      try {
        const { data } = await signUp(signUpData);

        notifySuccess('You have successfully signed up. Please sign in.');

        return data;
      } catch (error: any) {
        notifyError(
          error.response.data.messages?.[0]?.errors?.[0] ??
            'Something went wrong. Please try again.',
        );
      }
    },
    {
      onSuccess: () => {
        // notifySuccess('You have successfully signed up. Please sign in.');
      },
      onError: () => {
        // notifyError('Something went wrong. Please try again.');
      },
    },
  );
};
