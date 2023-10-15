import { useQuery } from "react-query";
import { Type } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { ValueOfFn } from "~/lib/reactQuery";
import { MovieDetails, MovieVideos } from "../types";
import { fetchMovie } from "./shared";

interface GetMovieDetailsOptions {
  id: string;
}

export async function getMovieDetails(options: GetMovieDetailsOptions) {
  const response = await fetchMovie(`/movie/${options.id}`);
  const data: unknown = await response.json();
  if (Value.Check(MovieDetails, data)) {
    return data;
  }
}

const MovieVideosResponse = Type.Object({
  results: MovieVideos,
});

export async function getMovieVideos(options: GetMovieDetailsOptions) {
  const response = await fetchMovie(`/movie/${options.id}/videos`);
  const data: unknown = await response.json();
  if (Value.Check(MovieVideosResponse, data)) {
    return data;
  }
}

export function useMovieDetails(options: GetMovieDetailsOptions) {
  return useQuery<ValueOfFn<typeof getMovieDetails>>({
    queryKey: ["movie-videos", options.id],
    queryFn: async () => {
      const results = await Promise.all([getMovieDetails(options), getMovieVideos(options)]);
      if (results[0] != null) {
        results[0].videos = results[1]?.results;
      }
      return results[0];
    },
  });
}
