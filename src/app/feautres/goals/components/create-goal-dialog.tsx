"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useGoalDialogStore } from "../store/use-goal-dialog-store";

export default function CreateGoalDialog() {
  const { isOpen, close } = useGoalDialogStore();
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create goal</DialogTitle>
        </DialogHeader>
        <div>tutaj content form do tworzenia goala</div>
      </DialogContent>
    </Dialog>
  );
}
