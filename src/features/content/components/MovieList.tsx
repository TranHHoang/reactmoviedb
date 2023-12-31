import { memo, useEffect, useState } from "react";
import { UseQueryResult } from "react-query";
import { MovieResponse } from "../api/movies";
import { Movie as MovieType } from "../types";
import { Movie } from "./Movie";
import { Pagination } from "./Pagination";
import { LoadingIndicator } from "./LoadingIndicator";

export interface MovieListProps {
  page: number;
  setPage: (page: number) => void;
  moviesQuery: UseQueryResult<MovieResponse | undefined> | undefined;
  sortBy: string;
}

export const MovieList = memo(function MovieList({ page, setPage, moviesQuery, sortBy }: MovieListProps) {
  const [totalPages, setTotalPages] = useState<number>();
  const [totalResults, setTotalResults] = useState<number>();
  const [sortedResults, setSortedResult] = useState<MovieType[]>([]);

  useEffect(() => {
    if (moviesQuery?.data == null) return;

    setTotalPages(moviesQuery.data.total_pages);
    setTotalResults(moviesQuery.data.total_results);
  }, [moviesQuery]);

  useEffect(() => {
    if (moviesQuery?.data == null) return;

    const sorted = [...moviesQuery.data.results];
    switch (sortBy) {
      case "score":
        sorted.sort((a, b) => a.vote_average - b.vote_average);
        break;
      case "name": {
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      }
      default:
        break;
    }
    setSortedResult(sorted);
  }, [sortBy, moviesQuery?.data]);

  return (
    <>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} totalResults={totalResults} />
      {moviesQuery?.isLoading ? (
        <LoadingIndicator />
      ) : moviesQuery?.data == null ? (
        <div className="font-bold text-red-500">Error while fetching data</div>
      ) : (
        <>
          {sortedResults.length === 0 && <div className="text-center">No result found</div>}
          <div className="grid grid-cols-fit5-gap4">
            {sortedResults.map((movie) => (
              <Movie key={movie.id} movie={movie} />
            ))}
          </div>
        </>
      )}
    </>
  );
});
