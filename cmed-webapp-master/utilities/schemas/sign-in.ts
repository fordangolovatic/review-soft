import * as yup from 'yup';

export const signInSchema = yup.object({
  email: yup.string().email('Email is not valid').required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password contains 8 char minimum')
    .max(32, 'Password contains 32 char maximum'),
  remember: yup.bool(),
});
