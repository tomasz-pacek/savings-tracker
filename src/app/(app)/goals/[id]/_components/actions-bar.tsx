"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDeleteGoalDialogStore } from "../store/use-delete-goal-dialog-store";
import { useEditGoalDialogStore } from "../store/use-edit-goal-dialog-store";

export default function ActionsBar() {
  const { open: openDeleteDialog } = useDeleteGoalDialogStore();
  const { open: openEditDialog } = useEditGoalDialogStore();
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-between px-2">
      {/* Back Button */}
      <Button
        className="text-muted-foreground hover:bg-muted-foreground/10 bg-transparent"
        onClick={() => router.back()}
      >
        <ChevronLeft />
        Back
      </Button>
      {/* Container to Edit and Delete Current Goal */}
      <div className="flex items-center justify-center gap-x-2">
        <Button
          onClick={() => openEditDialog()}
          className="text-foreground hover:bg-foreground/10 bg-transparent"
        >
          Edit goal
        </Button>
        <Button
          onClick={() => openDeleteDialog()}
          className="text-destructive hover:bg-destructive/10 bg-transparent"
        >
          Delete goal
        </Button>
      </div>
    </div>
  );
}
