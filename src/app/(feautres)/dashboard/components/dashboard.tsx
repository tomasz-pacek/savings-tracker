import { Goal } from "@/db/schema";
import DashboardStats from "./dashboard-stats";
import DashbaordGoalGrid from "./dashboard-goal-grid";

type Props = {
  userGoals: Goal[];
  goalsCount: number;
};

export default function Dashboard({ userGoals, goalsCount }: Props) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <main className="flex-1 p-6 ">
        <div className="max-w-4xl mx-auto">
          <DashboardStats goalsCount={goalsCount} />
          {/* monthly deposits */}
          <div className="w-full">
            {/* TODO: EMPTY STATE i DANE STATUSTYCZNE */}
          </div>
          {/* GOALE */}
          <DashbaordGoalGrid userGoals={userGoals} />
        </div>
      </main>
    </div>
  );
}
