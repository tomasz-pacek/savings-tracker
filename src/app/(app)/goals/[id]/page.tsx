import { getCurrentSession } from "@/lib/auth-utils";
import ActionsBar from "./_components/actions-bar";
import GoalDetails from "./_components/goal-details";
import DepositHistory from "./_components/deposit-history";
import AddDepositCard from "./_components/add-deposit-card";
import DeleteGoalDialog from "./_components/delete-goal-dialog";
import EditGoalDialog from "./_components/edit-goal-dialog";
import { getGoal } from "./get-goal";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props) {
  const session = await getCurrentSession();
  if (!session) {
    return {
      title: "Goal",
    };
  }

  const { id } = await params;
  const userGoal = await getGoal(id, session.user.id);

  return {
    title: userGoal.name ?? "Goal not found",
  };
}

export default async function GoalPage({ params }: Props) {
  const session = await getCurrentSession();
  const { id } = await params;

  if (!session) {
    return;
  }

  const currentUserId = session.user.id;

  const userGoal = await getGoal(id, currentUserId);
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
