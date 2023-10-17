import { faker } from "@faker-js/faker";
import { test, render, screen, expect, describe, createMovie } from "~/test/testUtils";
import { Movie } from "../Movie";

describe("<Movie />", () => {
  test("should show Image Not Found if poster_path is null", async () => {
    render(<Movie movie={createMovie(null)} />);
    await screen.findByText(/image not found/i);
    expect(screen.getByText(/image not found/i)).toBeInTheDocument();
  });

  test("should show image if poster_path is present", async () => {
    render(<Movie movie={createMovie(faker.image.url())} />);
    await screen.findByRole("img");
    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
