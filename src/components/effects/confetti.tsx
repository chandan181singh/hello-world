"use client";

import confetti from "canvas-confetti";

export function fireConfetti() {
  const colors = ["#a855f7", "#ec4899", "#06b6d4", "#84cc16", "#f5f5f4"];
  const defaults = {
    spread: 90,
    ticks: 100,
    gravity: 0.9,
    decay: 0.94,
    startVelocity: 35,
    colors,
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.1,
      shapes: ["star", "circle"],
    });
    confetti({
      ...defaults,
      particleCount: 12,
      scalar: 1.8,
      shapes: ["circle"],
    });
  }

  shoot();
  setTimeout(shoot, 120);
  setTimeout(shoot, 260);
}
