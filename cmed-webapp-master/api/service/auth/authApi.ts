import { AxiosResponse } from 'axios';
import api from '../../config/api';
import {
  SignInFormData,
  SignInResponse,
  SignUpFormData,
  SignUpResponse,
} from '../../types/auth/auth';

const authApi = () => {
  const signIn = async (
    loginData: SignInFormData,
  ): Promise<AxiosResponse<SignInResponse>> => {
    return await api.post('auth/login', loginData);
  };

  const signUp = async (registerData: SignUpFormData): Promise<SignUpResponse> => {
    return await api.post('users', registerData);
  };

  return { signIn, signUp };
};

export default authApi;
