import { Navigate } from "react-router-dom";

/** Free Resources hub — land on the main gateway page */
export default function FreeResourcesPage() {
  return <Navigate to="/free_resources/ncert-books" replace />;
}
