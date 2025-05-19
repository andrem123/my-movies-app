'use client';

import Link from 'next/link';
import MovieCard from '@/components/MovieCard/MovieCard';

interface MovieSummary {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
  overview: string;
}

interface Props {
  movies: MovieSummary[];
  from: string;
  title: string;
}

const MovieCarousel = ({ movies, from, title }: Props) => (
  <section className="mb-10">
    <h2 className="text-2xl font-bold mb-3">{title}</h2>
    <div className="flex gap-4 overflow-x-auto pb-2">
      {movies.map((m) => (
        <Link
          key={m.id}
          href={{ pathname: `/movie/${m.id}`, query: { from } }}
          className="shrink-0 w-40"
        >
          <MovieCard
            title={m.title}
            voteAverage={m.vote_average}
            posterPath={m.poster_path}
            releaseYear={parseInt(m.release_date)}
            description={m.overview}
          />
        </Link>
      ))}
    </div>
  </section>
);

export default MovieCarousel;