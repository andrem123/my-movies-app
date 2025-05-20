"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { getNowPlayingMovies } from "@/services/movies/getNowPlayingMovies";
import MovieList from "@/components/MovieList/MovieList";

export default function NowPlayingPage() {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState<any[]>([]);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const data = await getNowPlayingMovies();
      setMovies(data.results);
      setLoading(false);
    };
    run();
  }, []);

  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Now Playing</h3>
      {loading && <h5 className="text-lg text-gray-500">Cargando…</h5>}
      {!loading && <MovieList movies={movies} from="now-playing" />}
    </div>
  );
}