import { redirect } from "@/lib/appRouter";

export default function ParentIndexPage() {
  redirect("/parent/course-details");
}
