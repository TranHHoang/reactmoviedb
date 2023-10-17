import { Link } from "react-router-dom";
import { useUserStore } from "~/stores/userStore";

export function NavBar() {
  const { user, clearUser } = useUserStore();

  return (
    <nav className="z-10 flex items-center justify-between p-4 px-4">
      {user && (
        <>
          <Link to="/" className="text-xl font-bold text-blue-300">
            TheMovieDB
          </Link>
          <button
            onClick={clearUser}
            className="rounded-lg bg-blue-700 px-5 py-2 text-sm font-semibold text-white shadow-lg"
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
