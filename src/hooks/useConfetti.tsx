import { create } from "zustand";

type ConfettiState = {
  confetti: boolean;
  setConfetti: (confetti: boolean) => void;
};

export const useConfetti = create<ConfettiState>((set) => ({
  confetti: false,
  setConfetti: (confetti) => set({ confetti }),
}));
