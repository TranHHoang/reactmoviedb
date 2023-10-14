import { lazy } from "~/utils/lazyImport";
import { Navigate, RouteObject } from "react-router-dom";

const { Login } = lazy(() => import("~/features/auth"), "Login");

export const publicRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
];
