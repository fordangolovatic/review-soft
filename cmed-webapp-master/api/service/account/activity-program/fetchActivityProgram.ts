import api from '../../../config/api';

export const getActivityProgram = async () => {
  const res = await api.get('users/activity-program');

  return res.data?.activityProgram;
};
