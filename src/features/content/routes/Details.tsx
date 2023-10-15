import { Link, useParams } from "react-router-dom";
import { Layout } from "../components/Layout";
import { YoutubeEmbed } from "../components/YoutubeEmbed";
import { useMovieDetails } from "../api/details";

export function Details() {
  const { id = "" } = useParams();
  const detailsQuery = useMovieDetails({ id });

  if (detailsQuery.isLoading) {
    return <div>Loading details...</div>;
  }

  if (detailsQuery.data == null) {
    return <div>{detailsQuery.error as string}</div>;
  }

  const details = detailsQuery.data;

  return (
    <Layout>
      <Link to="/">Back to Home</Link>
      <h2>{details.title}</h2>
      <p className="italic">{details.tagline}</p>
      <img src={`https://image.tmdb.org/t/p/w500${details.backdrop_path}`} />
      <div>
        {details.genres.map((genre) => (
          <span className="mr-1 rounded bg-blue-100 px-2.5 py-0.5 text-xs text-blue-800" key={genre.id}>
            {genre.name}
          </span>
        ))}
      </div>
      <p>{details.overview}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {(details.videos ?? []).slice(0, 2).map((video) => (
          <YoutubeEmbed key={video.key} embedId={video.key} />
        ))}
      </div>
    </Layout>
  );
}
