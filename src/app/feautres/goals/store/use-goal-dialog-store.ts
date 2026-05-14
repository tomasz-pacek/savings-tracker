import { create } from "zustand";

type GoalDialogState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useGoalDialogStore = create<GoalDialogState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
