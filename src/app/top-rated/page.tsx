'use client';
export const dynamic = "force-dynamic";

import { useEffect, useState } from 'react';
import { getTopRatedMovies } from '@/services/movies/getTopRatedMovies';
import MovieList from '@/components/MovieList/MovieList';

const TopRatedPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopRated = async () => {
      setLoading(true);
      try {
        const data = await getTopRatedMovies();
        setMovies(data.results);
      } catch (err) {
        console.error('Error loading movies: ', err);
      }
      setLoading(false);
    };

    fetchTopRated();
  }, []);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Top Rated</h3>
      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}
      <MovieList movies={movies} from="top-rated" />
    </div>
  );
};

export default TopRatedPage;