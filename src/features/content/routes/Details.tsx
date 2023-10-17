import { useParams } from "react-router-dom";
import { cx } from "~/utils/cx";
import { Layout } from "../components/Layout";
import { YoutubeEmbed } from "../components/YoutubeEmbed";
import { useMovieDetails } from "../api/details";
import { LoadingIndicator } from "../components/LoadingIndicator";

export function Details() {
  const { id = "" } = useParams();
  const detailsQuery = useMovieDetails({ id });

  if (detailsQuery.isLoading) {
    return (
      <div className="mt-10">
        <LoadingIndicator />
      </div>
    );
  }

  if (detailsQuery.data == null) {
    return <div>{(detailsQuery.error as string) || "Error while fetching details"}</div>;
  }

  const details = detailsQuery.data;

  return (
    <Layout>
      {details.backdrop_path && (
        <img
          className="absolute top-0 -z-10 w-full brightness-50"
          src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
        />
      )}
      <div className={cx("text-center", details.backdrop_path && "text-white")}>
        <h2 className="text-2xl font-semibold">{details.title}</h2>
        <p className="italic">{details.tagline}</p>
        <div className="my-2">
          {details.genres.map((genre) => (
            <span className="mr-1 rounded bg-blue-100 px-2.5 py-0.5 text-sm text-blue-800" key={genre.id}>
              {genre.name}
            </span>
          ))}
        </div>
        <div className="mx-20 mt-10 flex flex-col items-center gap-8 max-md:mx-5 lg:flex-row">
          <p className="text-justify max-md:rounded-lg max-md:border max-md:border-gray-200 max-md:bg-gray-200 max-md:p-6 max-md:text-slate-500 max-md:shadow">
            {details.overview}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {(details.videos ?? []).slice(0, 1).map((video) => (
              <YoutubeEmbed key={video.key} embedId={video.key} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
