"use client";
export const dynamic = "force-dynamic";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import MovieList from "@/components/MovieList/MovieList";
import Pagination from "@/components/Pagination/Pagination";
import { getFavoriteMovies } from "@/services/accounts/getFavoriteMovies";
import { useGuestSession } from "@/providers/GuestSessionContext";

function FavoritesCSR() {
  const { guestSessionId } = useGuestSession();
  const params = useSearchParams();
  const page = parseInt(params.get("page") || "1", 10);

  const [movies, setMovies] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!guestSessionId) return;
    const run = async () => {
      setLoading(true);
      const data = await getFavoriteMovies(guestSessionId, page);
      setMovies(data.results);
      setTotalPages(data.total_pages);
      setLoading(false);
    };
    run();
  }, [guestSessionId, page]);

  return (
    <>
      {loading && <h5 className="text-lg text-gray-500">Loading…</h5>}
      {!loading && movies.length === 0 && (
        <p className="text-center mt-10 text-gray-600">No favorites yet.</p>
      )}
      {!loading && movies.length > 0 && (
        <MovieList movies={movies} from="favorites" />
      )}
      <Pagination page={page} totalPages={totalPages} path="/my-favorites" />
    </>
  );
}

export default function MyFavoritesPage() {
  return (
    <div>
      <h3 className="text-3xl font-bold mb-6">My Favorite Movies</h3>
      <Suspense fallback={null}>
        <FavoritesCSR />
      </Suspense>
    </div>
  );
}