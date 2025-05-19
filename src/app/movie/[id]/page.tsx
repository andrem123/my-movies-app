'use client';
import { useEffect, useState } from 'react';
import { IMovieDetail } from '@/types/MovieDetail';
import Image from 'next/image';
import { getMovieById } from '@/services/movies/getMovieById';
import { markAsFavorite } from '@/services/accounts/markAsFavorite';
import { getMovieRecommendations } from '@/services/movies/getMovieRecommendations';
import MovieCarousel from '@/components/MovieCarousel/MovieCarousel';
import { useGuestSession } from '@/providers/GuestSessionContext';
import { useParams } from 'next/navigation';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<IMovieDetail>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recs, setRecs] = useState<any[]>([]);
  const { guestSessionId } = useGuestSession();

  useEffect(() => {
    if (!id || typeof id !== 'string') return;
    const run = async () => {
      try {
        const [detail, recData] = await Promise.all([
          getMovieById(id),
          getMovieRecommendations(id, 1),
        ]);
        setMovie(detail);
        setRecs(recData.results);
      } catch {
        setError('Could not load movie.');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  useEffect(() => {
    if (!id || typeof id !== 'string') return;
    const stored = JSON.parse(localStorage.getItem('favoriteMovieIds') || '[]');
    setIsFavorite(stored.includes(Number(id)));
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!guestSessionId || !movie) return;
    const next = !isFavorite;
    await markAsFavorite(movie.id, next, guestSessionId);
    setIsFavorite(next);
    const stored: number[] = JSON.parse(localStorage.getItem('favoriteMovieIds') || '[]');
    const updated = next
      ? [...new Set([...stored, movie.id])]
      : stored.filter((x) => x !== movie.id);
    localStorage.setItem('favoriteMovieIds', JSON.stringify(updated));
  };

  if (loading) return <div>Loading movie...</div>;
  if (error || !movie) return <div>{error || 'No movie found.'}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-6">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="rounded-xl w-full sm:w-64"
          width={300}
          height={450}
        />
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="italic text-slate-500">{movie.tagline}</p>
          <p>{movie.overview}</p>
          <div>
            <strong>Release:</strong> {movie.release_date.toString()}
          </div>
          <div>
            <strong>Genres:</strong> {movie.genres.map((g) => g.name).join(', ')}
          </div>
          <div>
            <strong>Rating:</strong> {movie.vote_average.toFixed(1)}
          </div>
          {guestSessionId && (
            <button
              onClick={handleToggleFavorite}
              className={`px-4 py-2 rounded cursor-pointer ${
                isFavorite
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-yellow-500 hover:bg-yellow-600'
              } text-white font-bold w-max`}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>
          )}
        </div>
      </div>

      {recs.length > 0 && (
        <MovieCarousel movies={recs} from="recommend" title="Recommended for you" />
      )}
    </div>
  );
};

export default MovieDetailPage;