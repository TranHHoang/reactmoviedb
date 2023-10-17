import { lazy } from "~/utils/lazyImport";
import { Navigate, RouteObject } from "react-router-dom";
import { ROUTES } from "./routes";

const { Contents } = lazy(() => import("~/features/content"), "Contents");
const { Details } = lazy(() => import("~/features/content"), "Details");

export const protectedRoutes: RouteObject[] = [
  {
    path: ROUTES.CONTENTS,
    element: <Contents />,
  },
  {
    path: `${ROUTES.DETAILS}:id`,
    element: <Details />,
  },
  {
    path: "*",
    element: <Navigate to={ROUTES.CONTENTS} />,
  },
];
