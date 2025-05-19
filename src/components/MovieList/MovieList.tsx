'use client';

import Link from 'next/link';
import MovieCard from '@/components/MovieCard/MovieCard';

interface MovieSummary {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string; // "YYYY-MM-DD"
  overview: string;
}

interface MovieListProps {
  movies: MovieSummary[];
  /** De dónde proviene la lista, para pasarlo como query -ej. "popular" | "now-playing" | "top-rated"- */
  from: string;
}

const MovieList = ({ movies, from }: MovieListProps) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
    {movies.map((movie) => (
      <Link
        key={movie.id}
        href={{
          pathname: `/movie/${movie.id}`,
          query: { from },
        }}
      >
        <MovieCard
          title={movie.title}
          voteAverage={movie.vote_average}
          posterPath={movie.poster_path}
          releaseYear={parseInt(movie.release_date)}
          description={movie.overview}
        />
      </Link>
    ))}
  </div>
);

export default MovieList;