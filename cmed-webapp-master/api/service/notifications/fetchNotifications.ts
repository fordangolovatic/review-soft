import { AxiosError } from 'axios';
import api from '../../config/api';
import { Notification } from '../../types/notifications';

export const fetchNotifications = async (): Promise<Notification[]> => {
  return await api
    .get('notifications')
    .then((res) => res.data)
    .catch((error) => {
      return error.response.data.data as AxiosError;
    });
};
