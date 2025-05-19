import api from '../api';

export const getGuestSession = async () => {
  const { data } = await api.get('/authentication/guest_session/new');
  return data;
};