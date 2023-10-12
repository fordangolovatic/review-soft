import * as yup from 'yup';

export const postSchema = yup.object({
  content: yup.string().required().min(3),
});
