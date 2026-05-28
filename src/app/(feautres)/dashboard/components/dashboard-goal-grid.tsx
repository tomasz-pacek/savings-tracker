import { Goal } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { getLayoutConfig } from "../lib/get-layout-config";
import Link from "next/link";

type Props = {
  userGoals: Goal[];
  maxDisplayed?: number;
};

export default function DashbaordGoalGrid({
  userGoals,
  maxDisplayed = 8,
}: Props) {
  const displayedGoals = userGoals.slice(0, maxDisplayed);

  const layout = useMemo(
    () => getLayoutConfig(displayedGoals.length),
    [displayedGoals.length],
  );

  return (
    <div className={cn("grid gap-4", layout.gridClass, layout.gridAreas)}>
      {displayedGoals.map((goal) => (
        <Link
          href={`/goals/${goal.id}`}
          key={goal.id}
          className="w-full border"
        >
          <p className="">{goal.name}</p>
        </Link>
      ))}
    </div>
  );
}
