"use client";

import GoalProgressBar from "@/components/shared/goal-progress-bar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Goal } from "@/db/schema";
import { calculateProgress } from "@/lib/calculate-progress";
import { formatStringDate } from "@/lib/format-string-date";
import { formatTimestampDate } from "@/lib/format-timestamp-date";
import { Calendar } from "lucide-react";
import Link from "next/link";

type Props = {
  goals: Goal[];
};

export default function GoalsGridView({ goals }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {goals.map((goal) => {
        const { currentAmount, targetAmount, deadline, createdAt } = goal;
        const goalProgress = calculateProgress(currentAmount, targetAmount);

        return (
          <Link href={`/goals/${goal.id}`} key={goal.id} className="group">
            <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex w-full items-center justify-between">
                    <h3 className="truncate text-base leading-tight font-semibold">
                      {goal.name}
                    </h3>
                    {deadline && (
                      <p className="text-muted-foreground mt-0.5 flex items-center gap-1 text-xs">
                        <Calendar className="h-3 w-3" />
                        Due {formatStringDate(deadline)}
                      </p>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="font-semibold">{goalProgress}%</span>
                  </div>
                  <GoalProgressBar value={goalProgress} />
                </div>

                <div className="bg-muted/50 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-muted-foreground text-xs">Saved</p>
                      <p className="text-lg font-bold">
                        ${currentAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="text-muted-foreground mx-2">→</div>
                    <div className="text-right">
                      <p className="text-muted-foreground text-xs">Goal</p>
                      <p className="text-lg font-bold">
                        ${targetAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="border-border/50 mt-2 border-t pt-2">
                    <p className="text-muted-foreground text-center text-xs">
                      ${(targetAmount - currentAmount).toLocaleString()}{" "}
                      remaining
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t pt-3">
                  <p className="text-muted-foreground text-xs">
                    Created {formatTimestampDate(createdAt)}
                  </p>
                  <span className="text-foreground group-hover:text-primary transition-color text-xs font-medium duration-300">
                    View details
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
