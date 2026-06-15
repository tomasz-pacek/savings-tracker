"use client";

import { cn } from "@/lib/utils";
import { Grid2x2, Rows2 } from "lucide-react";
import { useQueryState } from "nuqs";

const viewOptions = [
  { value: "grid", icon: Grid2x2 },
  { value: "flex", icon: Rows2 },
] as const;

type Props = { startTransition: React.TransitionStartFunction };

export default function ViewToggle({ startTransition }: Props) {
  const [view, setView] = useQueryState("view", {
    defaultValue: "grid",
    shallow: false,
    startTransition,
  });
  return (
    <div className="flex flex-col items-start justify-center gap-2">
      <div className="flex items-center justify-start gap-2">
        {viewOptions.map(({ value, icon: Icon }) => {
          const active = view === value;
          return (
            <button
              key={value}
              onClick={() => setView(value)}
              className={cn(
                "bg-muted-foreground/10 cursor-pointer rounded-lg border p-2 transition-all duration-300",
                active
                  ? "border-muted-foreground"
                  : "hover:border-muted-foreground/50 border-transparent",
              )}
            >
              <Icon size={14} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
