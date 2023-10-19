import { useEffect, useMemo, useState } from "react";
import { useDebounce, useClickAway } from "~/hooks";
import { Layout } from "../components/Layout";
import { MovieList } from "../components/MovieList";
import { useMovies, useSearchMovies } from "../api/movies";

interface DropDownButton {
  name: string;
  onClick: () => void;
}

export function Contents() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<"default" | "score" | "name">("default");
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useClickAway<HTMLDivElement>(() => setShowDropdown(false));
  const debouncedQuery = useDebounce(query, 300);
  const isSearching = useMemo(() => debouncedQuery.trim() !== "", [debouncedQuery]);
  const sortOptions: DropDownButton[] = [
    {
      name: "Default",
      onClick: () => setSortBy("default"),
    },
    {
      name: "Score",
      onClick: () => setSortBy("score"),
    },
    {
      name: "Name",
      onClick: () => setSortBy("name"),
    },
  ];

  const moviesQuery = useMovies({ page: page.toString() }, !isSearching);
  const moviesSearchQuery = useSearchMovies({ page: page.toString(), query: debouncedQuery.trim() }, isSearching);

  useEffect(() => {
    setPage(1);
  }, [debouncedQuery]);

  return (
    <Layout>
      <div className="flex">
        <div className="relative flex-1">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 outline-none"
            placeholder="Search Movie Titles..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div>
          <div
            className="flex h-full cursor-pointer items-center bg-gray-100 px-5 text-sm"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <span className="mr-1 font-bold">Sort by</span>
            {sortBy[0].toUpperCase() + sortBy.slice(1)}
          </div>
          {showDropdown && (
            <div
              data-testid="dropdown"
              className="absolute right-0 z-10 w-44 divide-gray-100 rounded-lg bg-white shadow"
              ref={dropdownRef}
            >
              <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                {sortOptions.map((op) => (
                  <li key={op.name}>
                    <button className="block w-full px-4 py-2 text-left hover:bg-gray-100" onClick={op.onClick}>
                      {op.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <MovieList
        moviesQuery={isSearching ? moviesSearchQuery : moviesQuery}
        page={page}
        setPage={setPage}
        sortBy={sortBy}
      />
    </Layout>
  );
}
