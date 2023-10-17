import { RouterProvider, createMemoryRouter } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { test, render, screen, userEvent, expect, rtlRender, describe } from "~/test/testUtils";
import { registeredUsers } from "~/utils/users";
import { ROUTES } from "~/routes/routes";
import { Login } from "../Login";

describe("<Login />", () => {
  test("should show error on wrong username/password", async () => {
    render(<Login />);

    const user = {
      username: faker.internet.userName(),
      password: faker.internet.password({ prefix: "test_password_" }),
    };

    await userEvent.type(screen.getByPlaceholderText(/username/i), user.username);
    await userEvent.type(screen.getByPlaceholderText(/password/i), user.password);

    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    const errorEl = screen.getByText(/wrong username or password/i);
    expect(errorEl).toBeInTheDocument();
  });

  test("should navigate to / on correct username & password", async () => {
    const router = createMemoryRouter(
      [
        {
          path: ROUTES.CONTENTS,
          element: <></>,
        },
        {
          path: ROUTES.LOGIN,
          element: <Login />,
        },
      ],
      {
        initialEntries: [ROUTES.LOGIN],
        initialIndex: 0,
      }
    );
    rtlRender(<RouterProvider router={router} />);
    expect(router.state.location.pathname).toBe(ROUTES.LOGIN);

    const user = registeredUsers[0];

    await userEvent.type(screen.getByPlaceholderText(/username/i), user.username);
    await userEvent.type(screen.getByPlaceholderText(/password/i), user.password);

    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(router.state.location.pathname).toBe(ROUTES.CONTENTS);
  });
});
