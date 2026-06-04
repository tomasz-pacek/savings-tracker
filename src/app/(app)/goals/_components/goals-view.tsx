"use client";

import { Goal } from "@/db/schema";
import { calculateProgress } from "@/lib/calculate-progress";
import { formatTimestampDate } from "@/lib/format-timestamp-date";
import { Loader } from "lucide-react";
import Link from "next/link";

type Props = {
  goals: Goal[];
  isPending: boolean;
};

export default function GoalsView({ goals, isPending }: Props) {
  if (isPending) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        {goals.map((goal) => (
          <Link
            href={`/goals/${goal.id}`}
            className="w-full bg-primary p-3 rounded-xl"
            key={goal.id}
          >
            <p className="">{goal.name}</p>
            <p>date: {formatTimestampDate(goal.createdAt)}</p>
            <p>
              {goal.currentAmount} | {goal.targetAmount}
            </p>
            <p>{calculateProgress(goal.currentAmount, goal.targetAmount)}%</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
