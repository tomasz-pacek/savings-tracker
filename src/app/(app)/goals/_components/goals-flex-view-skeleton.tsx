"use client";

import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  goalsLength: number;
};

export default function GoalsFlexViewSkeleton({ goalsLength }: Props) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: goalsLength }, (_, i) => (
        <div
          key={i}
          className="bg-card flex w-full items-center justify-between space-y-4 rounded-xl p-4"
        >
          <div className="justiy-center flex flex-col items-start gap-4">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className=""></div>
        </div>
      ))}
    </div>
  );
}
