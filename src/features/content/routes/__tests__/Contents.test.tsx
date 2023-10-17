import { vi } from "vitest";
import { faker } from "@faker-js/faker";
import { test, render, screen, expect, describe, createMovie, userEvent, waitFor } from "~/test/testUtils";
import { Contents } from "../Contents";

const fakeQuery = faker.commerce.productName();

vi.mock("../../api/movies", () => ({
  useMovies: () => {
    return {
      data: {
        results: Array.from({ length: 10 }, (_, id) => ({
          ...createMovie(null),
          title: `${10 - id}`,
          vote_average: 10 - id,
        })),
      },
      isLoading: false,
      isError: false,
    };
  },
  useSearchMovies: () => {
    return {
      data: {
        results: Array.from({ length: 10 }, () => ({
          ...createMovie(null),
          title: fakeQuery,
        })),
      },
      isLoading: false,
      isError: false,
    };
  },
}));

describe("<Contents />", () => {
  test("should show/hide sort option when clicking the button", async () => {
    render(<Contents />);

    await userEvent.click(await screen.findByText(/sort by/i));
    expect(screen.getByTestId("dropdown")).toBeInTheDocument();

    await userEvent.click(document.body);
    expect(screen.queryByTestId("dropdown")).not.toBeInTheDocument();
  });

  test("should sort by title ascendingly if the sort option is name", async () => {
    render(<Contents />);
    expect(screen.getAllByText(/image not found/i)).toHaveLength(10);

    await userEvent.click(await screen.findByText(/sort by/i));
    await userEvent.click(await screen.findByText(/name/i));

    const first = screen.getAllByTestId("title").at(0);

    expect(first).toHaveTextContent(/^1$/);
  });

  test("should sort by vote_average ascendingly if the sort option is score", async () => {
    render(<Contents />);
    expect(screen.getAllByText(/image not found/i)).toHaveLength(10);

    await userEvent.click(await screen.findByText(/sort by/i));
    await userEvent.click(await screen.findByText(/score/i));

    const first = screen.getAllByTestId("vote_average").at(-1);

    expect(first).toHaveTextContent(/^10$/);
  });

  test("should restore the original order after sorting by name", async () => {
    render(<Contents />);
    // Confirm the original order
    expect(screen.getAllByTestId("vote_average").at(0)).toHaveTextContent(/^10$/);

    await userEvent.click(await screen.findByText(/sort by/i));
    await userEvent.click(await screen.findByText(/name/i));

    // Confirm the sort is working
    expect(screen.getAllByTestId("vote_average").at(0)).toHaveTextContent(/^1$/);

    await userEvent.click(await screen.findByText(/default/i));
    expect(screen.getAllByTestId("vote_average").at(0)).toHaveTextContent(/^10$/);
  });

  test("should call the search API if the query input is not empty", async () => {
    render(<Contents />);
    await userEvent.type(await screen.findByPlaceholderText(/search movie titles/i), fakeQuery);
    await waitFor(() => expect(screen.getAllByTestId("title").at(0)).toHaveTextContent(fakeQuery));
  });
});
