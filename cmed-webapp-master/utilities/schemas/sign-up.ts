import * as yup from 'yup';

export const signUpSchema = yup.object({
  firstName: yup
    .string()
    .required('First Name is required')
    .min(2, 'First Name contains 2 char minimum '),
  lastName: yup
    .string()
    .required('Last Name is required')
    .min(2, 'Last Name contains 2 char minimum '),
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password contains 8 char minimum')
    .max(32, 'Password contains 32 char maximum'),
  passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
});
