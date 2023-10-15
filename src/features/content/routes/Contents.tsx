import { useMemo, useState } from "react";
import { useDebounce } from "~/hooks/useDebounce";
import { Layout } from "../components/Layout";
import { MoviePagination } from "../components/MoviePagination";
import { useMovies, useSearchMovies } from "../api/movies";

export function Contents() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const debouncedQuery = useDebounce(query, 300);

  const isSearching = useMemo(() => debouncedQuery.trim() !== "", [debouncedQuery]);

  const moviesQuery = useMovies({ page: page.toString() }, !isSearching);
  const moviesSearchQuery = useSearchMovies({ page: page.toString(), query: debouncedQuery.trim() }, isSearching);

  return (
    <Layout>
      <div>
        <input placeholder="Enter your search" onChange={(e) => setQuery(e.target.value)} />
        <label>
          Sort display items:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="name">Sort by name</option>
            <option value="score">Sort by score</option>
          </select>
        </label>
      </div>
      <MoviePagination
        moviesQuery={isSearching ? moviesSearchQuery : moviesQuery}
        page={page}
        setPage={setPage}
        sortBy={sortBy}
      />
    </Layout>
  );
}
