"use client";

import { Goal } from "@/db/schema";

type Props = {
  goals: Goal[];
};

export default function GoalsView({ goals }: Props) {
  return (
    <>
      {goals.map((goal) => (
        <div className="w-full bg-background/50" key={goal.id}>
          <p className="">{goal.name}</p>
        </div>
      ))}
    </>
  );
}
