import { PropsWithChildren } from "react";
import { NavBar } from "./NavBar";

export function Layout({ children }: PropsWithChildren) {
  return (
    <div>
      <NavBar />
      <div>{children}</div>
    </div>
  );
}
