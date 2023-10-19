import { useRoutes } from "react-router-dom";
import { useUserStore } from "~/stores/userStore";
import { protectedRoutes } from "./protected";
import { publicRoutes } from "./public";

export function AppRoutes() {
  const { user } = useUserStore();
  const element = useRoutes([...(user ? protectedRoutes : publicRoutes)]);
  return <>{element}</>;
}
