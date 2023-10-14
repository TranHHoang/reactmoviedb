import { useRoutes } from "react-router-dom";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";
import { useUserStore } from "~/stores/userStore";

export function AppRoutes() {
  const { user } = useUserStore();
  const element = useRoutes([...(user ? protectedRoutes : publicRoutes)]);
  return <>{element}</>;
}
