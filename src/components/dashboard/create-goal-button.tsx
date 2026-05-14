"use client";

import { Plus } from "lucide-react";
import ActionButton from "../action-button";
import { useGoalDialogStore } from "@/app/feautres/goals/store/use-goal-dialog-store";

export default function CreateGoalButton() {
  const open = useGoalDialogStore((s) => s.open);
  return (
    <ActionButton onClick={open} className="cursor-pointer">
      <Plus />
      Create new goal
    </ActionButton>
  );
}
