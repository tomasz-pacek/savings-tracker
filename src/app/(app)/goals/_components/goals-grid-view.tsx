"use client";

import GoalProgressBar from "@/components/shared/goal-progress-bar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Goal } from "@/db/schema";
import { calculateProgress } from "@/lib/calculate-progress";
import { formatStringDate } from "@/lib/format-string-date";
import { formatTimestampDate } from "@/lib/format-timestamp-date";
import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";
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
        const remaining = targetAmount - currentAmount;
        const completed = remaining === 0;

        return (
          <Link href={`/goals/${goal.id}`} key={goal.id} className="group">
            <Card className="h-full overflow-hidden transition-all duration-300 hover:-translate-y-0.5">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex w-full items-center justify-between">
                    <h3
                      className={
                        (cn("truncate text-base leading-tight font-semibold"),
                        completed ? "text-success" : "text-foreground")
                      }
                    >
                      {goal.name}
                    </h3>
                  </div>
                  {completed && (
                    <Badge className="text-success bg-success/20 border-success font-normal">
                      COMPLETE
                    </Badge>
                  )}
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={cn(
                        completed ? "text-success" : "text-foreground",
                      )}
                    >
                      Progress
                    </span>
                    <span
                      className={cn(
                        "font-semibold",
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
                  <div className="text-muted-foreground flex items-center justify-center">
                    <p className="text-xs">
                      Created {formatTimestampDate(createdAt)}
                    </p>
                    {deadline && (
                      <>
                        <Dot />
                        <p className="text-xs">
                          Due {formatStringDate(deadline)}
                        </p>
                      </>
                    )}
                  </div>
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
