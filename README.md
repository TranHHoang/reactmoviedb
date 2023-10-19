# ReactMovieDB

Search and view movies' details from TheMovieDB

## Demo

Run the demo app on [Vercel](https://reactmoviedb-six.vercel.app/)

## Technologies

- React
- TailwindCSS
- Zustand
- React Query
- TypeBox

## Run Locally

_Requires `NodeJS 18+` and `pnpm`_

To install `pnpm`

- On POSIX systems

```bash
  curl -fsSL https://get.pnpm.io/install.sh | sh -
```

- On Windows (using Powershell)

```powershell
  iwr https://get.pnpm.io/install.ps1 -useb | iex
```

Clone the project and install the dependencies

```bash
  git clone https://github.com/TranHHoang/reactmoviedb
  cd reactmoviedb
  pnpm i
```

Request the API key from [TheMovieDB](https://developer.themoviedb.org/docs/authentication-application), then edit the `.env` file with your API key

```
  VITE_MOVIEDB_API_KEY=<Your API Key>
```

Start the dev server

```bash
  pnpm dev
```

### Login Accounts

- Account 1

```
  Username: admin
  Password: admin
```

- Account 2

```
  Username: user
  Password: user
```

## Running Tests

To run tests, use the following command

```bash
  pnpm test
```

To generate the coverage, use the following command

```bash
  pnpm coverage
```

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2023-present, Tran Hoang
