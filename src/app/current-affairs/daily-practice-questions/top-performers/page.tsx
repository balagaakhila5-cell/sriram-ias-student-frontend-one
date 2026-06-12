import { redirect } from "next/navigation";

export default function DpqTopPerformersRedirectPage() {
  redirect("/current-affairs/daily-practice-questions/test-results?examType=prelims");
}
