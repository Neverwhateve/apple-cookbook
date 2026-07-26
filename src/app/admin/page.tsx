import { redirect } from "next/navigation";

/** The short administrator URL leads to the authenticated workspace. */
export default function AdminPage() {
  redirect("/admin/feedback");
}
