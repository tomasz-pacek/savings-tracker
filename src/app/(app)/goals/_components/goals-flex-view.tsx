"use client";

import GoalProgressBar from "@/components/shared/goal-progress-bar";
import { Card } from "@/components/ui/card";
import { Goal } from "@/db/schema";
import { calculateProgress } from "@/lib/calculate-progress";
import { formatStringDate } from "@/lib/format-string-date";
import { formatTimestampDate } from "@/lib/format-timestamp-date";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Props = {
  goals: Goal[];
};

export default function GoalsFlexView({ goals }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {goals.map((goal) => {
        const { currentAmount, targetAmount, deadline, createdAt } = goal;
        const goalProgress = calculateProgress(currentAmount, targetAmount);
        const remaining = targetAmount - currentAmount;
        const completed = remaining === 0;

        return (
          <Link href={`/goals/${goal.id}`} key={goal.id} className="group">
            <Card className="overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center gap-4 p-4">
                {/* Title + meta */}
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                  <h3 className="truncate text-lg leading-tight font-semibold">
                    {goal.name}
                  </h3>
                  <div className="text-muted-foreground flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span>Created {formatTimestampDate(createdAt)}</span>
                    {deadline && (
                      <span className="flex items-center gap-1">
                        Due {formatStringDate(deadline)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress (desktop) */}
                <div className="hidden w-lg shrink-0 flex-col gap-1.5 sm:flex">
                  <div className="flex items-center justify-between text-xs">
                    <span
                      className={cn(
                        "text-base",
                        completed ? "text-success" : "text-muted-foreground",
                      )}
                    >
                      Progress
                    </span>
                    <span
                      className={cn(
                        "text-base font-semibold",
                        completed ? "text-success" : "text-foreground",
                      )}
                    >
                      {goalProgress}%
                    </span>
                  </div>
                  <GoalProgressBar
                    value={goalProgress}
                    fillClassName={completed ? "bg-success" : undefined}
                  />
                </div>

                <ChevronRight
                  className={cn(
                    "text-muted-foreground size-5 shrink-0 transition-all duration-300",
                    completed
                      ? "group-hover:text-success"
                      : "group-hover:text-primary",
                  )}
                />
              </div>

              {/* Progress (mobile) */}
              <div className="flex flex-col gap-2 border-t px-4 py-3 sm:hidden">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{goalProgress}%</span>
                </div>
                <GoalProgressBar
                  value={goalProgress}
                  fillClassName={completed ? "bg-success" : undefined}
                />
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
