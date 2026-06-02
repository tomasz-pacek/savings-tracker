"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateGoalDialogStore } from "../store/use-create-goal-dialog-store";
import CreateGoalForm from "./create-goal-form";

export default function CreateGoalDialog() {
  const { isOpen, close } = useCreateGoalDialogStore();
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>Create goal</DialogTitle>
        </DialogHeader>
        <CreateGoalForm />
      </DialogContent>
    </Dialog>
  );
}
