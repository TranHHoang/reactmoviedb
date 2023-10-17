import React from "react";
import { QueryClient } from "react-query";
import { render as rtlRender } from "@testing-library/react";
import { faker } from "@faker-js/faker";
import { AppProvider } from "~/providers/AppProvider";
import { Movie as MovieType } from "~/features/content/types";

export const render = (ui: React.JSX.Element) => {
  const value = {
    ...rtlRender(ui, {
      wrapper: AppProvider,
    }),
  };
  return value;
};

export function createMovie(posterPath: string | null): MovieType {
  return {
    id: faker.number.int(),
    title: faker.commerce.productName(),
    overview: faker.commerce.productDescription(),
    poster_path: posterPath,
    vote_average: faker.number.float({ precision: 0.1 }),
  };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export * from "@testing-library/react";
export * from "@testing-library/user-event";
export * from "vitest";
export { rtlRender };
