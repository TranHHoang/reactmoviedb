const BASE_URL = `https://api.themoviedb.org/3`;

export function fetchMovie(route: string, params: URLSearchParams = new URLSearchParams()) {
  return fetch(`${BASE_URL}${route}?api_key=${import.meta.env.VITE_MOVIEDB_API_KEY}&${params.toString()}`);
}
