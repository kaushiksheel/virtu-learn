"use client";

import ReactConfetti from "react-confetti";

import { useConfetti } from "@/hooks/useConfetti";

export default function ConfettiProvider() {
  const { confetti, setConfetti } = useConfetti();

  return confetti ? (
    <ReactConfetti
      className="pointer-events-none z-[99]"
      numberOfPieces={500}
      recycle={false}
      onConfettiComplete={() => setConfetti(false)}
    />
  ) : null;
}
