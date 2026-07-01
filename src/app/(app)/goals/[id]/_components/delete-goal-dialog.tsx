"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useDeleteGoalDialogStore } from "../store/use-delete-goal-dialog-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useTransition } from "react";
import { deleteGoal } from "../actions";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import ActionButton from "@/components/shared/action-button";

export default function DeleteGoalDialog() {
  const { isOpen, close } = useDeleteGoalDialogStore();
  const params = useParams();
  const router = useRouter();

  const [confirmationInputValue, setConfirmationInputValue] =
    useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleDeleteGoal = async () => {
    startTransition(async () => {
      const result = await deleteGoal(params.id as string);

      if (result.success) {
        router.push("/");
        toast("Goal deleted");
      } else {
        toast(result.error);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent
        className="p-5"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this goal?</DialogTitle>
        </DialogHeader>
        <form className="mt-4 flex w-full flex-col items-center justify-center gap-3">
          <Label
            htmlFor="confirmation-input"
            className="text-muted-foreground flex w-full flex-wrap"
          >
            Type in{" "}
            <span className="text-foreground font-medium">
              &quot;delete&quot;
            </span>{" "}
            to permanently delete this goal.
          </Label>
          <Input
            id="confirmation-input"
            type="text"
            autoComplete="off"
            value={confirmationInputValue}
            onChange={(e) => {
              setConfirmationInputValue(e.target.value);
            }}
            className="w-full rounded-sm py-5"
          />
          <ActionButton
            className="w-full rounded-sm py-5 text-base"
            disabled={confirmationInputValue !== "delete"}
            loadingSpinner
            isPending={isPending}
            onClick={handleDeleteGoal}
          >
            Delete
          </ActionButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
