import { getCurrentSession } from "@/lib/auth-utils";
import UserDetailsCard from "./_components/user-details-card";
import { redirect } from "next/navigation";

export default async function UserSettingsPage() {
  const session = await getCurrentSession();

  if (!session) redirect("/");

  return (
    <main className="container mx-auto mt-6">
      <div className="flex w-full gap-6">
        <UserDetailsCard user={session.user} />
        <div className="flex-1">test</div>
      </div>
    </main>
  );
}
