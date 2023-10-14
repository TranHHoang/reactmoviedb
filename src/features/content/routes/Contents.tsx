import { useNavigate } from "react-router-dom";
import { ROUTES } from "~/routes/routes";
import { Layout } from "../components/Layout";

export function Contents() {
  const navigate = useNavigate();

  return (
    <Layout>
      Contents Page
      <button
        onClick={() => {
          navigate(`${ROUTES.DETAILS}/123`);
        }}
      >
        To details
      </button>
    </Layout>
  );
}
