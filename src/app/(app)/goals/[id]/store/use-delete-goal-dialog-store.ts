import { create } from "zustand";

type DeleteGoalDialogState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useDeleteGoalDialogStore = create<DeleteGoalDialogState>(
  (set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }),
);
