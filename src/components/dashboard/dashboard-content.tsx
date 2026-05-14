import { db } from "@/db";
import { getCurrentSession } from "@/lib/auth-utils";
import { goal } from "@/db/schema";
import { eq } from "drizzle-orm";
import { EmptyDashboard } from "./empty-dashboard";
import CreateGoalDialog from "@/app/feautres/goals/components/create-goal-dialog";

export default async function DashboardContent() {
  const session = await getCurrentSession();
  const userId = session?.user.id;

  if (!userId) {
    return <div>No user</div>;
  }

  const [userGoals, goalsCount] = await Promise.all([
    db.select().from(goal).where(eq(goal.userId, userId)),
    db.$count(goal, eq(goal.userId, userId)),
  ]);

  return (
    <>
      {userGoals.length > 0 ? <div>goale ziomeczka</div> : <EmptyDashboard />}
      <CreateGoalDialog />
    </>
  );
}
