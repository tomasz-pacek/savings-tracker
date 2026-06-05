"use client";

import GoalProgressBar from "@/components/shared/goal-progress-bar";
import { Card } from "@/components/ui/card";
import { Goal } from "@/db/schema";
import { calculateProgress } from "@/lib/calculate-progress";
import { formatStringDate } from "@/lib/format-string-date";
import { formatTimestampDate } from "@/lib/format-timestamp-date";
import { Calendar, ChevronRight } from "lucide-react";
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

        return (
          <Link href={`/goals/${goal.id}`} key={goal.id} className="group">
            <Card className="hover:border-foreground overflow-hidden border border-transparent transition-all duration-300">
              <div className="flex items-center justify-between gap-4 p-4">
                {/* <div className="">
                  <h3 className="truncate text-base font-semibold">
                    {goal.name}
                  </h3>
                  <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
                    <span>Created {formatTimestampDate(createdAt)}</span>
                    {deadline && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Due {formatStringDate(deadline)}
                      </span>
                    )}
                  </div>
                </div> */}
                <div className="flex flex-col items-start justify-center gap-2">
                  <h3 className="text-base font-semibold">{goal.name}</h3>
                  <p>Created {formatTimestampDate(createdAt)}</p>
                </div>
                <div>siema</div>
              </div>

              {/* mobile view */}
              <div className="space-y-2 border-t px-4 py-3 sm:hidden">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{goalProgress}%</span>
                </div>
                <GoalProgressBar value={goalProgress} />
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
