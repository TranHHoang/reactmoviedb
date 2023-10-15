import { useQuery } from "react-query";
import { Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { Movie } from "../types";

const BASE_URL = `https://api.themoviedb.org/3`;

const MovieResponse = Type.Object({
  results: Type.Array(Movie),
  total_pages: Type.Number(),
  total_results: Type.Number(),
});

export type MovieResponse = Static<typeof MovieResponse>;

function fetchMovie(route: string) {
  return fetch(`${BASE_URL}/${route}&api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}`);
}

interface GetMovieOptions {
  page: string;
}

export async function getMovies(options: GetMovieOptions) {
  const params = new URLSearchParams({
    include_adult: "false",
    language: "en-US",
    ...options,
  });
  const response = await fetchMovie(`/discover/movie?${params.toString()}`);
  const data: unknown = await response.json();
  if (Value.Check(MovieResponse, data)) {
    return data;
  }
}

export function useMovies(options: GetMovieOptions, enabled = true) {
  return useQuery<Awaited<ReturnType<typeof getMovies>>>({
    queryKey: ["movies", options.page],
    queryFn: () => getMovies(options),
    enabled,
  });
}

interface SearchMovieOptions {
  query: string;
  page: string;
}

export async function searchMovies(options: SearchMovieOptions) {
  const params = new URLSearchParams({
    include_adult: "false",
    ...options,
  });
  const response = await fetchMovie(`/search/movie?${params.toString()}`);
  const data: unknown = await response.json();
  if (Value.Check(MovieResponse, data)) {
    return data;
  }
}

export function useSearchMovies(options: SearchMovieOptions, enabled = true) {
  return useQuery<Awaited<ReturnType<typeof searchMovies>>>({
    queryKey: ["search-movies", options.query, options.page],
    queryFn: () => searchMovies(options),
    enabled,
  });
}
