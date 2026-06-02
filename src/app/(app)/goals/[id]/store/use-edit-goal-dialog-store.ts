import { create } from "zustand";

type EditGoalDialogState = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

export const useEditGoalDialogStore = create<EditGoalDialogState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
