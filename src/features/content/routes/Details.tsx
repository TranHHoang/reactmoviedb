import { useParams } from "react-router-dom";
import { Layout } from "../components/Layout";

export function Details() {
  const params = useParams();

  return (
    <Layout>
      <div>Passed id: {params.id}</div>
    </Layout>
  );
}
