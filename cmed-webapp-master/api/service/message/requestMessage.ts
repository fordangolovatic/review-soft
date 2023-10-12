import api from '../../config/api';
import { SendMessage } from '../../types/account/messages/messages';

export const requestMessage = async (message: SendMessage) => {
  return await api.post('messages', message).then((res) => res.data);
};
