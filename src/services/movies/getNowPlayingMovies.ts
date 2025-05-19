import api from '../api';

export const getNowPlayingMovies = async (page = 1) => {
  const { data } = await api.get(`/movie/now_playing?language=en-US&page=${page}`);
  return data;
};