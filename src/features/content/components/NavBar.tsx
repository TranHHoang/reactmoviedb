import { useUserStore } from "~/stores/userStore";

export function NavBar() {
  const { user, clearUser } = useUserStore();

  return (
    <div>
      {user && (
        <>
          <div>Hello, {user.username}!</div>
          <button onClick={clearUser} className="bg-slate-400">
            Logout
          </button>
        </>
      )}
    </div>
  );
}
