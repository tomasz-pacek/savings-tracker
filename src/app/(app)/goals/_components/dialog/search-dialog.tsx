"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { Search } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";
import { useEffect, useState } from "react";

type Props = {
  startTransition: React.TransitionStartFunction;
};

export default function SearchDialog({ startTransition }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLocaleLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    shallow: false,
    startTransition,
    limitUrlUpdates: {
      method: "debounce",
      timeMs: 500,
    },
  });

  const [, setPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1).withOptions({ shallow: false }),
  );

  return (
    <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
      <DialogContent
        className="top-1/4 rounded-sm border-none p-0"
        showCloseButton={false}
      >
        <InputGroup className="w-full rounded-sm py-5 focus-visible:ring-offset-0">
          <InputGroupInput
            type="text"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setOpen(false);
              }
            }}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align={"inline-end"}>
            <Kbd className="bg-card px-2 py-3.5 text-xs">Enter</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </DialogContent>
    </Dialog>
  );
}
