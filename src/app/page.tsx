import MovieCarousel from '@/components/MovieCarousel/MovieCarousel';
import { getPopularMovies } from '@/services/movies/getPopularMovies';
import { getTopRatedMovies } from '@/services/movies/getTopRatedMovies';
import { getNowPlayingMovies } from '@/services/movies/getNowPlayingMovies';

const HomePage = async () => {
  const [popular, topRated, nowPlaying] = await Promise.all([
    getPopularMovies(1),
    getTopRatedMovies(1),
    getNowPlayingMovies(1),
  ]);

  return (
    <div className="space-y-12">
      <MovieCarousel movies={popular.results.slice(0, 10)} from="popular" title="Popular" />
      <MovieCarousel movies={topRated.results.slice(0, 10)} from="top-rated" title="Top Rated" />
      <MovieCarousel movies={nowPlaying.results.slice(0, 10)} from="now-playing" title="Now Playing" />
    </div>
  );
};

export default HomePage;