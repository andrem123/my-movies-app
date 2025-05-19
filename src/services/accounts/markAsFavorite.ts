import api from '../api';

export const markAsFavorite = async (
  movieId: number,
  favorite: boolean,
  guestSessionId: string,
) => {
  const body = { media_type: 'movie', media_id: movieId, favorite };
  const { data } = await api.post(
    `/account/${guestSessionId}/favorite`,
    body,
    { params: { guest_session_id: guestSessionId } },
  );
  return data;
};