import { DefaultOptions, QueryClient } from "react-query";

const defaultOptions: DefaultOptions = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry: false,
  },
};

export const queryClient = new QueryClient({ defaultOptions });

type Fn<T> = T extends (...args: infer U) => infer R ? (...args: U) => R : never;

export type ValueOfFn<T> = Awaited<ReturnType<Fn<T>>>;
