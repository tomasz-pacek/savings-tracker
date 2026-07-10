"use client";

import { Goal } from "@/db/schema";
import { Target } from "lucide-react";
import GoalsGridView from "./goals-grid-view";
import { useSearchParams } from "next/navigation";
import GoalsFlexView from "./goals-flex-view";
import GoalsGridViewSkeleton from "./goals-grid-view-skeleton";
import GoalsFlexViewSkeleton from "./goals-flex-view-skeleton";

type Props = {
  goals: Goal[];
  isPending: boolean;
};

export default function GoalsView({ goals, isPending }: Props) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? "grid";

  if (isPending) {
    return (
      <div className="w-full flex-1">
        {view === "grid" ? (
          <GoalsGridViewSkeleton goalsLength={goals.length} />
        ) : (
          <GoalsFlexViewSkeleton goalsLength={goals.length} />
        )}
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-20">
        <div className="bg-muted/50 mb-4 rounded-full p-4">
          <Target className="text-muted-foreground h-10 w-10" />
        </div>
        <h3 className="mb-1 text-lg font-semibold">No goals yet</h3>
        <p className="text-muted-foreground text-sm">
          Create your first savings goal to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {view === "grid" ? (
        <GoalsGridView goals={goals} />
      ) : (
        <GoalsFlexView goals={goals} />
      )}
    </div>
  );
}
