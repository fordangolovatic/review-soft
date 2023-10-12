import * as yup from 'yup';

export const chatOptionsSchema = yup.object({
  expire: yup
    .number()
    .typeError('Must be a number')
    .positive('Must be positive')
    .required('Expiration is required')
    .max(30, (expire) => `Maximum ${expire.max} days allowed.`),
});
