import api from '../api';

export const getMovieRecommendations = async (movieId: string | number, page = 1) => {
  try {
    const { data } = await api.get(
      `/movie/${movieId}/recommendations?language=en-US&page=${page}`,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
