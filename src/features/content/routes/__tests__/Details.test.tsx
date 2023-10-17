import { vi } from "vitest";
import { faker } from "@faker-js/faker";
import {
  test,
  render,
  screen,
  expect,
  describe,
  waitFor,
  renderHook,
  queryClient,
  afterEach,
  createMovie,
} from "~/test/testUtils";
import { Details } from "../Details";
import { delay } from "~/utils/utils";
import { QueryClientProvider, useQuery } from "react-query";
import { PropsWithChildren } from "react";

const mocks = vi.hoisted(() => {
  return {
    useMovieDetails: vi.fn(),
  };
});

vi.mock("../../api/details", () => ({
  useMovieDetails: mocks.useMovieDetails,
}));

const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("<Details />", () => {
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
          },
        }),
      { wrapper }
    );
    mocks.useMovieDetails.mockReturnValue(result.current);

    render(<Details />);

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

    mocks.useMovieDetails.mockReturnValue(result.current);
    render(<Details />);

    expect(screen.getByText(/error while fetching details/i)).toBeInTheDocument();
  });

  test("should show the movie details if the query is success", async () => {
    const { result } = renderHook(
      () =>
        useQuery({
          queryKey: ["customHook1"],
          queryFn: async () => {
            await delay(100);
            return {
              ...createMovie(null),
              backdrop_path: faker.image.urlPlaceholder(),
              genres: [],
              videos: [{ key: faker.string.uuid() }],
            };
          },
        }),
      { wrapper }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    mocks.useMovieDetails.mockReturnValue(result.current);
    render(<Details />);

    await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument());
  });

  test("should not show YoutubeEmbed on no videos", async () => {
    const { result } = renderHook(
      () =>
        useQuery({
          queryKey: ["customHook2"],
          queryFn: async () => {
            await delay(100);
            return {
              ...createMovie(null),
              backdrop_path: faker.image.urlPlaceholder(),
              genres: [],
            };
          },
        }),
      { wrapper }
    );
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    mocks.useMovieDetails.mockReturnValue(result.current);
    render(<Details />);

    await waitFor(() => expect(screen.queryByRole("iframe")).not.toBeInTheDocument());
  });
});
