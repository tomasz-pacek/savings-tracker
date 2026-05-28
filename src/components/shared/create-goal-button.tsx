"use client";

import { useGoalDialogStore } from "@/app/(feautres)/goals/store/use-goal-dialog-store";
import { Button } from "../ui/button";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function CreateGoalButton({ children, className }: Props) {
  const open = useGoalDialogStore((s) => s.open);
  return (
    <Button onClick={open} className={className}>
      {children}
    </Button>
  );
}
