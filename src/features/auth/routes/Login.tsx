import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/routes/routes";
import { useUserStore } from "~/stores/userStore";

interface User {
  username: string;
  password: string;
}

const registeredUsers: User[] = [
  {
    username: "admin",
    password: "admin",
  },
  {
    username: "user",
    password: "user",
  },
];

export function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setUser } = useUserStore();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const username = usernameRef.current?.value ?? "";
    const password = usernameRef.current?.value ?? "";

    if (registeredUsers.find((u) => u.username === username && u.password === password)) {
      setUser({ username });
      navigate(ROUTES.CONTENTS);
    } else {
      setError("User not found! Please check your input again");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>
          Username
          <input ref={usernameRef} required />
        </label>
      </div>
      <div>
        <label>
          Password
          <input type="password" ref={passwordRef} required />
        </label>
      </div>
      {error && <div>{error}</div>}
      <div>
        <button type="submit">Sign In</button>
      </div>
    </form>
  );
}
