"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoalDialogStore } from "../store/use-goal-dialog-store";
import CreateGoalForm from "./create-goal-form";

export default function CreateGoalDialog() {
  const { isOpen, close } = useGoalDialogStore();
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
