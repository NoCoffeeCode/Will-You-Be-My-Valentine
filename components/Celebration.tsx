
import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface CelebrationProps {
  active: boolean;
}

const Celebration: React.FC<CelebrationProps> = ({ active }) => {
  useEffect(() => {
    if (!active) return;

    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Hearts
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff4d88', '#ff99cc', '#ffd1dc'],
        shapes: ['circle'], // Note: canvas-confetti doesn't have native hearts easily, circles look great mixed with logic
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff4d88', '#ff99cc', '#ffd1dc'],
        shapes: ['circle'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, [active]);

  return null;
};

export default Celebration;
