"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDebounce } from "@/hooks/use-debounce";
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
    <div className="bg-card flex w-full flex-col rounded-xl p-4">
      <p
        className={`text-foreground mb-4 font-medium ${jetBrainsMono.className}`}
      >
        Filters
      </p>

      <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="search-input"
            className={`text-muted-foreground text-sm ${jetBrainsMono.className}`}
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
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label
            className={`text-muted-foreground text-sm font-medium ${jetBrainsMono.className}`}
          >
            Sort by date
          </Label>
          <Button
            onClick={() => {
              setDateOrder((prev) => (prev === "asc" ? "desc" : "asc"));
            }}
            className="bg-muted-foreground/10 hover:bg-muted-foreground/20 w-full"
          >
            {dateOrder === "desc" ? "Newest first" : "Oldest first"}
          </Button>
        </div>

        <div className="flex flex-col gap-2">
          <Label
            className={`text-muted-foreground text-sm font-medium ${jetBrainsMono.className}`}
          >
            View
          </Label>
          <ViewToggle startTransition={startTransition} />
        </div>
      </div>
    </div>
  );
}
