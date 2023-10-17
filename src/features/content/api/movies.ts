import { useQuery } from "react-query";
import { Static, Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { Movie } from "../types";
import { fetchMovie } from "./shared";
import { ValueOfFn } from "~/lib/reactQuery";

const MovieResponse = Type.Object({
  results: Type.Array(Movie),
  total_pages: Type.Number(),
  total_results: Type.Number(),
});

export type MovieResponse = Static<typeof MovieResponse>;

interface GetMovieOptions {
  page: string;
}

async function getMovies(options: GetMovieOptions) {
  const params = new URLSearchParams({
    include_adult: "false",
    language: "en-US",
    ...options,
  });
  const response = await fetchMovie("/discover/movie", params);
  const data: unknown = await response.json();
  if (Value.Check(MovieResponse, data)) {
    return data;
  }
}

export function useMovies(options: GetMovieOptions, enabled = true) {
  return useQuery<ValueOfFn<typeof getMovies>>({
    queryKey: ["movies", options.page],
    queryFn: () => getMovies(options),
    enabled,
  });
}

interface SearchMovieOptions {
  query: string;
  page: string;
}

async function searchMovies(options: SearchMovieOptions) {
  const params = new URLSearchParams({
    include_adult: "false",
    ...options,
  });
  const response = await fetchMovie("/search/movie", params);
  const data: unknown = await response.json();
  if (Value.Check(MovieResponse, data)) {
    return data;
  }
}

export function useSearchMovies(options: SearchMovieOptions, enabled = true) {
  return useQuery<ValueOfFn<typeof searchMovies>>({
    queryKey: ["search-movies", options.query, options.page],
    queryFn: () => searchMovies(options),
    enabled,
  });
}
