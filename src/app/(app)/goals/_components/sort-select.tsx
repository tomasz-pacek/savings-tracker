"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryState } from "nuqs";

type Props = {
  startTransition: React.TransitionStartFunction;
};

export default function SortSelect({ startTransition }: Props) {
  const [sort, setSort] = useQueryState("sort", {
    defaultValue: "date-desc",
    shallow: false,
    startTransition,
  });
  return (
    <Select value={sort} onValueChange={(value) => setSort(value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="date-desc">Date: newest first</SelectItem>
          <SelectItem value="date-asc">Date: oldest first</SelectItem>
          <SelectItem value="progress-desc">
            Progress: most completed
          </SelectItem>
          <SelectItem value="progress-asc">
            Progress: least completed
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
