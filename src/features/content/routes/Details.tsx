import { useParams } from "react-router-dom";

export function Details() {
  const params = useParams();

  return <div>Passed id: {params.id}</div>;
}
