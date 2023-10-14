import { AppRoutes } from "~/routes";
import { AppProvider } from "~/providers/AppProvider";

export function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
