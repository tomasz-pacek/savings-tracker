import { Goal } from "@/db/schema";
import DashboardStats from "./dashboard-stats";
import DashbaordGoalGrid from "./dashboard-goal-grid";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  userGoals: Goal[];
  goalsCount: number;
};

export default function Dashboard({ userGoals, goalsCount }: Props) {
  const userTotalSavingsValue = userGoals.reduce(
    (acc, goal) => acc + goal.currentAmount,
    0,
  );
  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl">
          <DashboardStats
            goalsCount={goalsCount}
            userTotalSavingsValue={userTotalSavingsValue}
          />
          {/* monthly deposits */}
          <div className="w-full">
            {/* TODO: EMPTY STATE i DANE STATUSTYCZNE */}
          </div>
          {/* GOALE */}
          <DashbaordGoalGrid userGoals={userGoals} />
          {userGoals.length > 8 && (
            <div className="mt-6 flex w-full items-center justify-center">
              <Button asChild>
                <Link href={"/goals"}>See more</Link>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
