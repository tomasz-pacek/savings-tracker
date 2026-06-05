"use client";

import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  goalsLength: number;
};

export default function GoalsGridViewSkeleton({ goalsLength }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: goalsLength }, (_, i) => (
        <div key={i} className="bg-card w-full space-y-4 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-24 w-full" />
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
