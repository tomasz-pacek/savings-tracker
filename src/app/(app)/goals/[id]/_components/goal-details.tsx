import GoalProgressBar from "@/components/shared/goal-progress-bar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Goal } from "@/db/schema";
import { calculateProgress } from "@/lib/calculate-progress";
import { calculateRemainingValue } from "@/lib/calculate-remaining-value";
import { formatStringDate } from "@/lib/format-string-date";
import { formatTimestampDate } from "@/lib/format-timestamp-date";
import { cn } from "@/lib/utils";
import { Dot } from "lucide-react";

type Props = {
  userGoal: Goal;
};

export default function GoalDetails({ userGoal }: Props) {
  const { currentAmount, targetAmount, deadline } = userGoal;
  const createdText = `Created ${formatTimestampDate(userGoal.createdAt)}`;
  const dueText = userGoal.deadline
    ? `Due ${formatStringDate(deadline)}`
    : null;

  const goalPercentProgress = calculateProgress(currentAmount, targetAmount);
  const remainingValue = calculateRemainingValue(currentAmount, targetAmount);
  const isCompleted = remainingValue === 0;

  return (
    <div className="mt-6 flex flex-col items-center justify-center gap-6 px-4">
      <div className="flex flex-col items-center justify-center gap-y-1">
        <h1 className="text-center text-4xl font-medium lg:text-6xl">
          {userGoal.name}
        </h1>
        <div className="flex items-center justify-center gap-x-1">
          <p className="text-muted-foreground text-sm">{createdText}</p>
          {dueText && (
            <>
              <Dot />
              <p className="text-muted-foreground text-sm">{dueText}</p>
            </>
          )}
        </div>
      </div>
      <Card className="w-full lg:w-3/5 lg:p-4">
        <CardContent>
          <div className="flex w-full items-center justify-between">
            <p
              className={cn(
                "text-primary text-5xl font-medium",
                isCompleted && "text-success",
              )}
            >
              {goalPercentProgress}%
            </p>
            {isCompleted ? (
              <Badge className="text-success bg-success/20 border-success font-normal">
                COMPLETE
              </Badge>
            ) : (
              <p className="text-muted-foreground text-lg font-medium">
                ${remainingValue.toFixed(2)} remaining
              </p>
            )}
          </div>

          <div className="my-6">
            <GoalProgressBar
              value={goalPercentProgress}
              fillClassName={isCompleted ? "bg-success" : undefined}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start justify-center gap-1">
              <p>${currentAmount}</p>
              <p className="text-muted-foreground">Saved so far</p>
            </div>
            <div className="flex flex-col items-start justify-center gap-1">
              <p>of ${targetAmount}</p>
              <p className="text-muted-foreground">Target</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
