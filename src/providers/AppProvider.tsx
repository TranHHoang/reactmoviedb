import { PropsWithChildren, Suspense } from "react";
import { QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { queryClient } from "~/lib/reactQuery";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </Router>
    </QueryClientProvider>
  );
}
