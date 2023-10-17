import { test, render, screen, expect, describe, vi, userEvent } from "~/test/testUtils";
import { Pagination } from "../Pagination";

describe("<Pagination />", () => {
  test("should fire the setPage event on click", async () => {
    const fn = vi.fn();
    render(<Pagination page={2} setPage={fn} totalPages={10} />);
    await userEvent.click(screen.getByText(/prev/i));
    await userEvent.click(screen.getByText(/next/i));

    expect(fn).toBeCalledTimes(2);
  });
});
