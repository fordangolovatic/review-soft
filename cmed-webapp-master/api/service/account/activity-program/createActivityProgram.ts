import api from '../../../config/api';
import { ActivityProgramItem } from '../../../types/account/account';

export const postActivityProgram = async (body: ActivityProgramItem[]) => {
  const res = await api.post('users/activity-program', { activityProgram: body });
  return res.data;
};
