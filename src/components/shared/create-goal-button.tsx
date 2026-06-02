"use client";

import { useCreateGoalDialogStore } from "@/app/(feautres)/goals/store/use-create-goal-dialog-store";
import { Button } from "../ui/button";

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function CreateGoalButton({ children, className }: Props) {
  const open = useCreateGoalDialogStore((s) => s.open);
  return (
    <Button onClick={open} className={className}>
      {children}
    </Button>
  );
}
