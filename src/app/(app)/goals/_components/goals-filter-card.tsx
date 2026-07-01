"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { JetBrains_Mono } from "next/font/google";
import { parseAsBoolean, parseAsInteger, useQueryState } from "nuqs";
import ViewToggle from "./view-toggle";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { X } from "lucide-react";
import SortSelect from "./sort-select";
import { useRef } from "react";
import { useFocusShortcut } from "@/hooks/use-focus-shortcut";
import { Kbd, KbdGroup } from "@/components/ui/kbd";

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
  const [hideCompleted, setHideCompleted] = useQueryState(
    "hideCompleted",
    parseAsBoolean
      .withDefault(false)
      .withOptions({ shallow: false, startTransition }),
  );
  const [, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );

  const searchInputRef = useRef<HTMLInputElement | null>(null);
  useFocusShortcut(searchInputRef, "k");

  const isMac =
    typeof navigator !== "undefined" &&
    navigator.platform.toUpperCase().includes("MAC");

  return (
    <div className="bg-card flex w-full flex-col rounded-xl p-4">
      <p
        className={`text-foreground mb-4 font-medium ${jetBrainsMono.className}`}
      >
        Filters
      </p>

      <div className="grid grid-cols-1 items-end gap-6 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto_1fr]">
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="search-input"
            className={`text-muted-foreground text-sm ${jetBrainsMono.className}`}
          >
            Search Filter
          </Label>
          <InputGroup className="rounded-sm py-5">
            <InputGroupInput
              id="search-input"
              ref={searchInputRef}
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
            <InputGroupAddon align={"inline-end"} className="hidden sm:block">
              <KbdGroup>
                <Kbd>{isMac ? "⌘" : "Ctrl"}</Kbd>
                <span>+</span>
                <Kbd>K</Kbd>
              </KbdGroup>
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div className="flex flex-col gap-2">
          <Label
            className={`text-muted-foreground text-sm font-medium ${jetBrainsMono.className}`}
          >
            Sort by date and progress
          </Label>
          <SortSelect startTransition={startTransition} />
        </div>
        <div className="flex w-full flex-col gap-2">
          <Label
            className={`text-muted-foreground text-sm font-medium ${jetBrainsMono.className}`}
          >
            Completed goals
          </Label>
          <Button
            variant="outline"
            onClick={() => setHideCompleted((prev) => !prev)}
            className="rounded-sm py-5"
          >
            {hideCompleted ? "Show" : "Hide"}
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
