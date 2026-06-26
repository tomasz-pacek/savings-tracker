"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { JetBrains_Mono } from "next/font/google";
import { parseAsInteger, useQueryState } from "nuqs";
import ViewToggle from "./view-toggle";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Ellipsis, X } from "lucide-react";

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
    limitUrlUpdates: {
      method: "debounce",
      timeMs: 500,
    },
  });
  const [dateOrder, setDateOrder] = useQueryState("dateOrder", {
    defaultValue: "desc",
    shallow: false,
    startTransition,
  });
  const [, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );

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
          <InputGroup>
            <InputGroupInput
              id="search-input"
              type="text"
              autoComplete="off"
              placeholder="Search by name"
              value={search}
              onChange={(e) => {
                setPage(1);
                setSearch(e.target.value);
              }}
              className="w-full"
            />
            <InputGroupAddon
              align={"inline-end"}
              className="cursor-pointer"
              onClick={() => {
                setSearch("");
              }}
            >
              <X />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex flex-col gap-2">
          <Label
            className={`text-muted-foreground text-sm font-medium ${jetBrainsMono.className}`}
          >
            Sort by date
          </Label>
          <Button
            onClick={() => {
              setPage(1);
              setDateOrder((prev) => (prev === "asc" ? "desc" : "asc"));
            }}
            className="bg-muted-foreground/10 hover:bg-muted-foreground/20 w-full"
          >
            {dateOrder === "desc"
              ? "Switch to oldest first"
              : "Switch to newest first"}
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
