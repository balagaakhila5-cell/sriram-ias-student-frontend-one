import { redirect } from "next/navigation";

/** Free Resources hub — land on the main gateway page */
export default function FreeResourcesPage() {
  redirect("/free_resources/ncert-books");
}
