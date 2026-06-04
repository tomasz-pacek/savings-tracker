"use client";

import { cn } from "@/lib/utils";
import { Grid2x2, Rows2 } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import { useQueryState } from "nuqs";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});

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
      <p
        className={`font-medium text-sm text-muted-foreground ${jetBrainsMono.className}`}
      >
        Change view
      </p>
      <div className="flex items-center justify-start gap-2">
        {viewOptions.map(({ value, icon: Icon }) => {
          const active = view === value;
          return (
            <button
              key={value}
              onClick={() => setView(value)}
              className={cn(
                "p-2 bg-muted-foreground/10 rounded-lg cursor-pointer border transition-all duration-300",
                active
                  ? "border-muted-foreground"
                  : "border-transparent hover:border-muted-foreground/50",
              )}
            >
              <Icon />
            </button>
          );
        })}
      </div>
    </div>
  );
}
