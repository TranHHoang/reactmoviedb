import { Link } from "react-router-dom";
import { ROUTES } from "~/routes/routes";
import { Movie as MovieType } from "../types";

export interface MovieProps {
  movie: MovieType;
}

export function Movie({ movie }: MovieProps) {
  return (
    <div className="w-full">
      <Link to={ROUTES.DETAILS + movie.id} className="cursor-pointer">
        {movie.poster_path ? (
          <img
            className="aspect-[2/3]"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            loading="lazy"
            title={movie.overview}
          />
        ) : (
          <div className="aspect-[2/3] w-full bg-slate-300">Image Not Found</div>
        )}
      </Link>
      <div>{movie.vote_average}</div>
      <div>{movie.title}</div>
    </div>
  );
}
