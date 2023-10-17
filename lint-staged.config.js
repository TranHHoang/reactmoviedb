/** @type {import("lint-staged").Config} */
export default {
  "*.{ts, tsx}": ["pnpm prettier --write", "pnpm eslint --fix", "pnpm test related -- --run"],
};
