import { PropsWithChildren, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
    </Router>
  );
}
