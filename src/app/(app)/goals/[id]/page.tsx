import { db } from "@/db";
import { goal } from "@/db/schema";
import { getCurrentSession } from "@/lib/auth-utils";
import { and, eq } from "drizzle-orm";
import ActionsBar from "./_components/actions-bar";
import GoalDetails from "./_components/goal-details";
import DepositHistory from "./_components/deposit-history";
import AddDepositCard from "./_components/add-deposit-card";
import DeleteGoalDialog from "./_components/delete-goal-dialog";
import EditGoalDialog from "./_components/edit-goal-dialog";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function GoalPage({ params }: Props) {
  const session = await getCurrentSession();
  const { id } = await params;

  if (!session) {
    return;
  }

  const currentUserId = session.user.id;

  const userGoal = await db
    .select()
    .from(goal)
    .where(and(eq(goal.id, id), eq(goal.userId, currentUserId)))
    .limit(1)
    .then((rows) => rows[0]);

  if (!userGoal) {
    return (
      <main className="container mx-auto">
        <p>Goal not found</p>
      </main>
    );
  }

  return (
    <main className="container mx-auto mt-6">
      <ActionsBar />
      <GoalDetails userGoal={userGoal} />
      <AddDepositCard userGoal={userGoal} />
      <DepositHistory goalId={id} />
      <DeleteGoalDialog />
      <EditGoalDialog
        goalName={userGoal.name}
        targetAmount={userGoal.targetAmount}
        deadline={userGoal.deadline}
      />
    </main>
  );
}
