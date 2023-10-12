import { AxiosError } from 'axios';
import api from '../../config/api';
import { Notification } from '../../types/notifications';

export const readNotifications = async (): Promise<Notification[]> => {
  return await api
    .post('notifications/read')
    .then((res) => res.data)
    .catch((error) => {
      return error.response.data as AxiosError;
    });
};
