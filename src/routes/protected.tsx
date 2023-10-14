import { lazy } from "~/utils/lazyImport";
import { Navigate, RouteObject } from "react-router-dom";

const { Contents } = lazy(() => import("~/features/content"), "Contents");
const { Details } = lazy(() => import("~/features/content"), "Details");

export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Contents />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
  {
    path: "*",
    element: <Navigate to="." />,
  },
];
