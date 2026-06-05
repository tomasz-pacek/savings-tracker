"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { Grid2x2, Rows2 } from "lucide-react";
import { JetBrains_Mono } from "next/font/google";
import { useQueryState } from "nuqs";
import { useEffect, useState } from "react";
import ViewToggle from "./view-toggle";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
});

type Props = {
  startTransition: React.TransitionStartFunction;
};

export default function GoalsFilterCard({ startTransition }: Props) {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
    startTransition,
  });
  const [dateOrder, setDateOrder] = useQueryState("dateOrder", {
    defaultValue: "desc",
    shallow: false,
    startTransition,
  });

  const [inputValue, setInputValue] = useState(search);

  const debouncedInputValue = useDebounce(inputValue, 500);
  useEffect(() => {
    setSearch(debouncedInputValue || null);
  }, [debouncedInputValue, setSearch]);

  return (
    <div className="bg-card flex w-full flex-col items-start justify-center gap-4 rounded-xl p-3 lg:w-1/5">
      <p className={`font-medium ${jetBrainsMono.className} text-foreground`}>
        Filters
      </p>
      <div className="flex w-full flex-col items-start justify-center gap-2">
        <Label
          htmlFor="search-input"
          className={`text-muted-foreground text-sm ${jetBrainsMono.className} `}
        >
          Search Filter
        </Label>
        <Input
          id="search-input"
          type="text"
          autoComplete="off"
          placeholder="Search by name"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div className="flex w-full flex-col items-start justify-center gap-2">
        <p
          className={`text-muted-foreground text-sm font-medium ${jetBrainsMono.className}`}
        >
          Sort by date
        </p>
        <Button
          onClick={() => {
            setDateOrder((prev) => (prev === "asc" ? "desc" : "asc"));
          }}
          className="bg-muted-foreground/10 w-full"
        >
          {dateOrder === "desc" ? "Newest first" : "Oldest first"}
        </Button>
      </div>
      <ViewToggle startTransition={startTransition} />
    </div>
  );
}
