import { lazy } from "~/utils/lazyImport";
import { Navigate, RouteObject } from "react-router-dom";
import { ROUTES } from "./routes";

const { Login } = lazy(() => import("~/features/auth"), "Login");

export const publicRoutes: RouteObject[] = [
  {
    path: ROUTES.LOGIN,
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.LOGIN} />,
  },
];
