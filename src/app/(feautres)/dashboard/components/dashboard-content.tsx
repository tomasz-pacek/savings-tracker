import { getCurrentSession } from "@/lib/auth-utils";
import Dashboard from "./dashboard";
import EmptyDashboard from "./empty-dashboard";
import { redirect } from "next/navigation";
import { getUserGoals } from "@/db/queries";

export default async function DashboardContent() {
  const session = await getCurrentSession();
  const userId = session?.user.id;

  if (!userId) redirect("/login");

  const userGoals = await getUserGoals(userId);

  return (
    <>
      {userGoals.length > 0 ? (
        <Dashboard userGoals={userGoals} goalsCount={userGoals.length} />
      ) : (
        <EmptyDashboard />
      )}
    </>
  );
}
