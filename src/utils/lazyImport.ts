import React from "react";

// Named lazy import: https://github.com/facebook/react/issues/14603#issuecomment-726551598
export function lazy<T extends React.ComponentType, I extends { [K2 in K]: T }, K extends keyof I>(
  factory: () => Promise<I>,
  name: K
): I {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
  }) as I;
}
