import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthed } from "@/lib/auth";
import { getAvailability, getPricing } from "@/lib/store";
import AdminEditor from "@/components/admin/AdminEditor";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Administration",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!(await isAuthed())) {
    redirect("/admin/login");
  }

  const [availability, pricing] = await Promise.all([
    getAvailability(),
    getPricing(),
  ]);

  return (
    <AdminEditor
      initialDates={availability.dates}
      initialRows={pricing.rows}
      initialNote={pricing.note}
    />
  );
}
