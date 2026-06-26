"use client";

import { Goal } from "@/db/schema";
import GoalsView from "./goals-view";
import { useTransition } from "react";
import GoalsFilterCard from "./goals-filter-card";
import GoalsPagination from "./goals-pagination";
import GoalsToolbar from "./goals-toolbar";

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
    <main className="center container mx-auto flex flex-col justify-center gap-3 p-6">
      <GoalsToolbar />
      <GoalsFilterCard startTransition={startTransition} />
      <GoalsView goals={goals} isPending={isPending} />
      <GoalsPagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
