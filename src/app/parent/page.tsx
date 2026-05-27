import { redirect } from "next/navigation";

export default function ParentIndexPage() {
  redirect("/parent/course-details");
}
