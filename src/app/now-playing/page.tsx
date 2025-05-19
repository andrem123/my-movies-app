'use client';

import { useEffect, useState } from 'react';
import { getNowPlayingMovies } from '@/services/movies/getNowPlayingMovies';
import MovieList from '@/components/MovieList/MovieList';

const NowPlayingPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      setLoading(true);
      try {
        const data = await getNowPlayingMovies();
        setMovies(data.results);
      } catch (err) {
        console.error('Error loading movies: ', err);
      }
      setLoading(false);
    };

    fetchNowPlaying();
  }, []);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Now Playing</h3>
      {loading && <h5 className="text-lg text-gray-500">Cargando...</h5>}
      <MovieList movies={movies} from="now-playing" />
    </div>
  );
};

export default NowPlayingPage;