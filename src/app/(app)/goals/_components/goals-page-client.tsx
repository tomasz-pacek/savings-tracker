"use client";

import { Goal } from "@/db/schema";
import GoalsView from "./goals-view";
import { useTransition } from "react";
import GoalsFilterCard from "./goals-filter-card";
import GoalsPagination from "./goals-pagination";

type Props = {
  goals: Goal[];
  currentPage: number;
  totalPages: number;
};

export default function GoalsPageClient({
  goals,
  currentPage,
  totalPages,
}: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <main className="container mx-auto flex flex-col items-start justify-center gap-6 p-6">
      <GoalsFilterCard startTransition={startTransition} />
      <GoalsView goals={goals} isPending={isPending} />
      <GoalsPagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
