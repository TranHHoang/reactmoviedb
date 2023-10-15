import { Type, Static } from "@sinclair/typebox";

export const Movie = Type.Object({
  id: Type.Number(),
  title: Type.String(),
  overview: Type.String(),
  poster_path: Type.Union([Type.String(), Type.Null()]),
  vote_average: Type.Number(),
});

export type Movie = Static<typeof Movie>;
