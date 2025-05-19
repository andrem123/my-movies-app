import api from '../api';

export const getTopRatedMovies = async (page = 1) => {
  const { data } = await api.get(`/movie/top_rated?language=en-US&page=${page}`);
  return data;
};