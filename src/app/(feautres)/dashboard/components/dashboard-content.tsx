import { db } from "@/db";
import { getCurrentSession } from "@/lib/auth-utils";
import { goal } from "@/db/schema";
import { eq } from "drizzle-orm";
import CreateGoalDialog from "@/app/(feautres)/goals/components/create-goal-dialog";
import Dashboard from "./dashboard";
import EmptyDashboard from "./empty-dashboard";

export default async function DashboardContent() {
  const session = await getCurrentSession();
  const userId = session?.user.id;

  if (!userId) {
    return <div>No user</div>;
  }

  const userGoals = await db.select().from(goal).where(eq(goal.userId, userId));

  return (
    <>
      {userGoals.length > 0 ? (
        <Dashboard userGoals={userGoals} goalsCount={userGoals.length} />
      ) : (
        <EmptyDashboard />
      )}
      <CreateGoalDialog />
    </>
  );
}
