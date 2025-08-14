import { create } from "zustand";

interface ReceiveState {
  isOpen: boolean;
}

interface ReceiveActions {
  openModal: () => void;
  closeModal: () => void;
}

export const useReceiveStore = create<ReceiveState & ReceiveActions>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));
