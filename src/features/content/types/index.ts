import { Type, Static } from "@sinclair/typebox";
import { Nullable } from "~/lib/typebox";

export const Movie = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  overview: Type.String(),
  poster_path: Nullable(Type.String()),
  vote_average: Type.Number(),
});

export type Movie = Static<typeof Movie>;

export const MovieVideos = Type.Array(
  Type.Object({
    key: Type.String(),
    site: Type.String(),
  })
);

export const MovieDetails = Type.Composite([
  Movie,
  Type.Object({
    genres: Type.Array(
      Type.Object({
        id: Type.Number(),
        name: Type.String(),
      })
    ),
    backdrop_path: Nullable(Type.String()),
    tagline: Type.String(),
    videos: Type.Optional(MovieVideos),
  }),
]);

export type MovieDetails = Static<typeof MovieDetails>;
