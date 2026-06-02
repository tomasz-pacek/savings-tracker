import { create } from "zustand";

type CreateGoalDialogState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useCreateGoalDialogStore = create<CreateGoalDialogState>(
  (set) => ({
    isOpen: false,
    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }),
);
