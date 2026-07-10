import { Goal } from "@/db/schema";
import DashboardStats from "./dashboard-stats";
import DashbaordGoalGrid from "./dashboard-goal-grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getCurrentSession } from "@/lib/auth-utils";
import { MonthlyDepositsGraph } from "./monthly-deposit-graph";
import { getMonthlyDeposits } from "../lib/get-monthly-deposits";

type Props = {
  userGoals: Goal[];
  goalsCount: number;
};

export default async function Dashboard({ userGoals, goalsCount }: Props) {
  const session = await getCurrentSession();
  if (!session?.user.id) return;

  const userTotalSavingsValue = userGoals.reduce(
    (acc, goal) => acc + goal.currentAmount,
    0,
  );
  const graphData = await getMonthlyDeposits(session?.user.id);

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 p-6">
        <div className="mx-auto lg:max-w-6xl">
          <DashboardStats
            goalsCount={goalsCount}
            userTotalSavingsValue={userTotalSavingsValue}
          />
          {/* monthly deposits */}
          <MonthlyDepositsGraph graphData={graphData} />
          {/* GOALE */}
          <DashbaordGoalGrid userGoals={userGoals} />
          {userGoals.length > 8 && (
            <div className="mt-6 flex w-full items-center justify-center">
              <Button asChild variant="outline" className="rounded-sm py-4">
                <Link href={"/goals"}>See more goals</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
