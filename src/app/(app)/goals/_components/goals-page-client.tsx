"use client";

import { Goal } from "@/db/schema";
import GoalsFilterBar from "./goals-filter-bar";
import GoalsView from "./goals-view";
import { useTransition } from "react";

type Props = {
  goals: Goal[];
};

export default function GoalsPageClient({ goals }: Props) {
  const [isPending, startTransition] = useTransition();
  return (
    <main className="container mx-auto flex flex-row items-start justify-center gap-6">
      <GoalsFilterBar startTransition={startTransition} />
      <GoalsView goals={goals} isPending={isPending} />
    </main>
  );
}
