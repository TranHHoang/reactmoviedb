import { lazy } from "~/utils/lazyImport";
import { RouteObject } from "react-router-dom";

const { Login } = lazy(() => import("~/features/auth"), "Login");

export const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
];
