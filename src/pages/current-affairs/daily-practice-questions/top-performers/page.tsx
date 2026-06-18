import { Navigate } from "react-router-dom";

export default function DpqTopPerformersRedirectPage() {
  return (
    <Navigate
      to="/current-affairs/daily-practice-questions/test-results?examType=prelims"
      replace
    />
  );
}
