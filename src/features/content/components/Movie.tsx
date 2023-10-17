import { Link } from "react-router-dom";
import { ROUTES } from "~/routes/routes";
import { Movie as MovieType } from "../types";

export interface MovieProps {
  movie: MovieType;
}

export function Movie({ movie }: MovieProps) {
  return (
    <div className="relative w-full">
      <Link to={ROUTES.DETAILS + movie.id} className="cursor-pointer">
        {movie.poster_path ? (
          <img
            className="aspect-[2/3]"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            loading="lazy"
            title={movie.overview}
          />
        ) : (
          <div className="flex aspect-[2/3] w-full items-center justify-center bg-slate-300">Image Not Found</div>
        )}
      </Link>
      <div
        className="absolute right-0 top-0 m-2 flex h-10 w-10 items-center justify-center rounded-full bg-gray-500 font-bold text-white"
        data-testid="vote_average"
      >
        {Math.round(movie.vote_average * 100) / 100}
      </div>
      <div className="my-2 text-xl font-semibold" data-testid="title">
        {movie.title}
      </div>
    </div>
  );
}
