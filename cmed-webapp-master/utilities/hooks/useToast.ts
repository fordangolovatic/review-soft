import { toast } from 'react-toastify';

export const useToast = () => {
  const notifySuccess = (successMessage: string) => toast.success(successMessage);

  const notifyError = (errorMessage: string) => toast.error(errorMessage);

  return { notifySuccess, notifyError };
};
