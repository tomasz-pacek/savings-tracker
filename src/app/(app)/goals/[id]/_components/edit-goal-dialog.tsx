"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditGoalDialogStore } from "../store/use-edit-goal-dialog-store";
import EditGoalForm from "./edit-goal-form";

type Props = {
  goalName: string;
  targetAmount: number;
  deadline: string | null;
};

export default function EditGoalDialog({
  goalName,
  targetAmount,
  deadline,
}: Props) {
  const { isOpen, close } = useEditGoalDialogStore();
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        className="p-8"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">Edit goal</DialogTitle>
        </DialogHeader>
        <EditGoalForm
          goalName={goalName}
          targetAmount={targetAmount}
          deadline={deadline}
        />
      </DialogContent>
    </Dialog>
  );
}
