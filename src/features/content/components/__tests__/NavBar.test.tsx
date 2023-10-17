import { faker } from "@faker-js/faker";
import { test, render, screen, expect, describe, userEvent, renderHook } from "~/test/testUtils";
import { useUserStore } from "~/stores/userStore";
import { NavBar } from "../NavBar";
import { act } from "react-dom/test-utils";

describe("<NavBar />", () => {
  test("should clear current user on clicking logout", async () => {
    render(<NavBar />);
    expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();

    const { result } = renderHook(() => useUserStore());
    act(() => {
      result.current.setUser({ username: faker.internet.userName() });
    });

    await userEvent.click(screen.getByText(/logout/i));

    expect(result.current.user).toBe(null);
  });
});
