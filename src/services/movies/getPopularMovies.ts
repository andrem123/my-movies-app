import api from '../api';

export const getPopularMovies = async (page = 1) => {
  const { data } = await api.get(`/movie/popular?language=en-US&page=${page}`);
  return data;
};