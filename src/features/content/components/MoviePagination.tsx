import { memo, useEffect, useState } from "react";
import { UseQueryResult } from "react-query";
import { MovieResponse } from "../api/movies";
import { Movie as MovieType } from "../types";
import { Movie } from "./Movie";

interface MoviePaginationProps {
  page: number;
  setPage: (page: number) => void;
  moviesQuery: UseQueryResult<MovieResponse | undefined> | undefined;
  sortBy: string;
}

export const MoviePagination = memo(function MoviePagination({
  page,
  setPage,
  moviesQuery,
  sortBy,
}: MoviePaginationProps) {
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
      <span>
        Showing {(page - 1) * 20 + 1} to {Math.min(totalResults ?? 0, page * 20)} of {totalResults ?? 0} entries
      </span>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Prev
        </button>
        <button onClick={() => setPage(page + 1)} disabled={page === (totalPages ?? 0)}>
          Next
        </button>
      </div>
      {moviesQuery?.isLoading ? (
        <div>Loading contents...</div>
      ) : moviesQuery?.data == null ? (
        <div>Error while fetching data</div>
      ) : (
        <div className="grid grid-cols-fit5-gap4">
          {sortedResults.map((movie) => (
            <Movie key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
});
