import api from '../../../config/api';
import { ActivityProgramItem } from '../../../types/account/account';

export const updateActivityProgram = async (body: ActivityProgramItem[]) => {
  const res = await api.patch('users/activity-program', { activityProgram: body });
  return res.status;
};
