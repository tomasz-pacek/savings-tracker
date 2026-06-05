"use client";

import { Goal } from "@/db/schema";
import GoalsView from "./goals-view";
import { useTransition } from "react";
import GoalsFilterCard from "./goals-filter-card";

type Props = {
  goals: Goal[];
};

export default function GoalsPageClient({ goals }: Props) {
  const [isPending, startTransition] = useTransition();
  return (
    <main className="container mx-auto flex flex-col items-start justify-center gap-6 px-4 lg:flex-row">
      <GoalsFilterCard startTransition={startTransition} />
      <GoalsView goals={goals} isPending={isPending} />
    </main>
  );
}
