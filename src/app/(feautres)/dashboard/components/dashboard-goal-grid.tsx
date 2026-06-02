import { Goal } from "@/db/schema";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { getLayoutConfig } from "../lib/get-layout-config";
import Link from "next/link";
import { calculateProgress } from "@/lib/calculate-progress";
import GoalProgressBar from "@/components/shared/goal-progress-bar";
import { Dot } from "lucide-react";
import { formatDate } from "@/lib/format-date";
import { Badge } from "@/components/ui/badge";

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
      {displayedGoals.map((goal, index) => {
        const { currentAmount, targetAmount, deadline } = goal;
        const goalPercentProgress = calculateProgress(
          currentAmount,
          targetAmount,
        );
        const dueText = deadline ? `Due ${formatDate(deadline)}` : null;
        const isSpecial = index % 6 === 0;
        const isCompleted = Number(currentAmount) >= Number(targetAmount);

        return (
          <Link
            href={`/goals/${goal.id}`}
            key={goal.id}
            className={cn(
              "w-full flex flex-col items-start justify-between gap-4 p-4 rounded-xl border hover:-translate-y-1 transition-all duration-300",
              isSpecial ? "bg-primary text-foreground" : "bg-card text-primary",
            )}
          >
            <div className="w-full flex items-center justify-between">
              <p className="text-base text-foreground">{goal.name}</p>
              {isCompleted && (
                <Badge className="text-success bg-success/20 border-success font-normal">
                  COMPLETE
                </Badge>
              )}
            </div>
            <div className="w-full flex flex-col items-start justify-center gap-2">
              <p
                className={cn(
                  "text-4xl font-bold",

                  isCompleted
                    ? "text-success"
                    : isSpecial
                      ? "text-foreground"
                      : "text-primary",
                )}
              >
                {goalPercentProgress}%
              </p>
              <GoalProgressBar
                value={goalPercentProgress}
                fillClassName={
                  isCompleted
                    ? "bg-success"
                    : isSpecial
                      ? "bg-white"
                      : undefined
                }
                trackClassName={isSpecial ? "bg-black/20" : undefined}
              />
              <div className="flex items-center justify-center">
                <p className="text-xs text-foreground">
                  ${Number(currentAmount).toFixed(0)} of $
                  {Number(targetAmount).toFixed(0)}
                </p>
                {dueText && (
                  <>
                    <Dot
                      className={cn(
                        isSpecial ? "text-foreground" : "text-muted-foreground",
                      )}
                    />
                    <p
                      className={cn(
                        "text-xs ",
                        isSpecial ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {dueText}
                    </p>
                  </>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
