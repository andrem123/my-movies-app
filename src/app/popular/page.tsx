"use client";
export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getPopularMovies } from "@/services/movies/getPopularMovies";
import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination/Pagination";

function PopularCSR() {
  const params = useSearchParams();
  const page = parseInt(params.get("page") || "1", 10);

  const [movies, setMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const data = await getPopularMovies(page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    };
    run();
  }, [page]);

  return (
    <>
      {loading && <h5 className="text-lg text-gray-500">Cargando…</h5>}
      {!loading && <MovieList movies={movies} from="popular" />}
      <Pagination page={page} totalPages={totalPages} path="/popular" />
    </>
  );
}

export default function PopularPage() {
  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">Popular Movies</h3>
      <Suspense fallback={null}>
        <PopularCSR />
      </Suspense>
    </div>
  );
}