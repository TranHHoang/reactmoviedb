import { QueryClientProvider, useQuery } from "react-query";
import { PropsWithChildren } from "react";
import {
  test,
  render,
  screen,
  expect,
  describe,
  vi,
  renderHook,
  waitFor,
  afterEach,
  createMovie,
  queryClient,
} from "~/test/testUtils";
import { delay } from "~/utils/utils";
import { MovieList, MovieListProps } from "../MovieList";

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockProps: MovieListProps = {
  page: 0,
  setPage: vi.fn(),
  sortBy: "",
  moviesQuery: undefined,
};

describe("<MovieList />", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  test("should show Loading... if the query is loading", () => {
    vi.useFakeTimers();
    const { result } = renderHook(
      () =>
        useQuery({
          queryFn: async () => {
            await delay(1000);
            return undefined;
          },
        }),
      { wrapper }
    );
    render(<MovieList {...mockProps} moviesQuery={result.current} />);
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("should show error if the query is failed/data is null", async () => {
    const { result } = renderHook(
      () =>
        useQuery({
          queryKey: ["customHook"],
          queryFn: async () => {
            await delay(100);
            return undefined;
          },
        }),
      { wrapper }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    render(<MovieList {...mockProps} moviesQuery={result.current} />);
    await waitFor(() => expect(screen.getByText(/error while fetching data/i)).toBeInTheDocument());
  });

  test("should show the result list if the query is success", async () => {
    const { result } = renderHook(
      () =>
        useQuery({
          queryKey: ["customHook2"],
          queryFn: async () => {
            await delay(100);
            return { results: Array.from({ length: 10 }, () => createMovie(null)), total_pages: 1, total_results: 10 };
          },
        }),
      { wrapper }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    render(<MovieList {...mockProps} moviesQuery={result.current} />);
    // await screen.findAllByText(/image not found/i);

    await waitFor(() => expect(screen.getAllByText(/image not found/i)).toHaveLength(10));
  });
});
