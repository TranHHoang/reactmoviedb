import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/routes/routes";
import { useUserStore } from "~/stores/userStore";
import { registeredUsers } from "~/utils/users";

export function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setUser } = useUserStore();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const username = usernameRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";

    if (registeredUsers.find((u) => u.username === username && u.password === password)) {
      setUser({ username });
      navigate(ROUTES.CONTENTS);
    } else {
      setError("Wrong username or password");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="w-96 text-center">
        <h2 className="mb-8 text-2xl font-bold">Sign in to your account</h2>
        <form onSubmit={onSubmit}>
          <div>
            <input
              ref={usernameRef}
              placeholder="Username"
              required
              className="w-full rounded-t-md border-2 border-b-slate-100 px-2 py-1 outline-blue-700"
            />
          </div>
          <div>
            <input
              type="password"
              ref={passwordRef}
              placeholder="Password"
              required
              className="w-full rounded-b-md border-2 border-t-0 px-2 py-1 outline-blue-700"
            />
          </div>
          {error && <div className="mt-6 font-semibold text-red-400">{error}</div>}
          <div>
            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-blue-700 py-1.5 font-semibold text-white hover:bg-blue-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
