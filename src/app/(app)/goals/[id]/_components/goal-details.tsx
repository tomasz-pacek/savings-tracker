import GoalProgressBar from "@/components/shared/goal-progress-bar";
import { Card, CardContent } from "@/components/ui/card";
import { Goal } from "@/db/schema";
import { calculateProgress } from "@/lib/calculate-progress";
import { calculateRemainingValue } from "@/lib/calculate-remaining-value";
import { formatDate } from "@/lib/format-date";
import { Dot } from "lucide-react";

type Props = {
  userGoal: Goal;
};

export default function GoalDetails({ userGoal }: Props) {
  const { currentAmount, targetAmount } = userGoal;
  const createdText = `Created ${formatDate(userGoal.createdAt)}`;
  const dueText = userGoal.deadline
    ? `Due ${formatDate(userGoal.deadline)}`
    : null;

  const goalPercentProgress = calculateProgress(currentAmount, targetAmount);
  const remainingValue = calculateRemainingValue(currentAmount, targetAmount);

  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-6">
      <div className="flex flex-col items-center justify-center gap-y-1">
        <h1 className="font-medium text-6xl">{userGoal.name}</h1>
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
      <Card className="w-3/5 p-4">
        <CardContent>
          <div className="w-full flex items-center justify-between">
            <p className="text-primary text-5xl font-medium">
              {goalPercentProgress}%
            </p>
            <p className="text-muted-foreground font-medium text-lg">
              ${remainingValue.toFixed(2)} remaining
            </p>
          </div>

          <div className="my-6">
            <GoalProgressBar value={goalPercentProgress} />
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
