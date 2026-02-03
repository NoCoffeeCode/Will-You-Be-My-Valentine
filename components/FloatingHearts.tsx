
import React, { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const FloatingHearts: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // We generate a large number of hearts to maintain a lush atmosphere
    const newHearts = Array.from({ length: 120 }).map((_, i) => {
      const duration = Math.random() * (30 - 15) + 15; // Range between 15s and 30s
      return {
        id: i,
        x: Math.random() * 100,
        size: Math.random() * (40 - 10) + 10,
        duration: duration,
        // Using positive delay so all hearts start at the bottom and stagger their entry
        // This prevents the "popping in" effect on initial load.
        delay: Math.random() * 25, 
        opacity: Math.random() * 0.35 + 0.1,
      };
    });
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute text-pink-400 select-none"
          style={{
            left: `${heart.x}%`,
            bottom: `-100px`, // Start fully off-screen
            fontSize: `${heart.size}px`,
            opacity: heart.opacity,
            animation: `floatUpWide ${heart.duration}s linear infinite`,
            animationDelay: `${heart.delay}s`,
            animationFillMode: 'backwards', // Ensure they stay at 0% state (bottom) during delay
          }}
        >
          ❤️
        </div>
      ))}
      <style>
        {`
          @keyframes floatUpWide {
            0% { 
              transform: translateY(0) rotate(0deg); 
              opacity: 0;
            }
            10% {
              opacity: inherit;
            }
            25% {
              transform: translateY(-30vh) translateX(-15px) rotate(90deg);
            }
            50% { 
              transform: translateY(-60vh) translateX(15px) rotate(180deg); 
            }
            75% {
              transform: translateY(-90vh) translateX(-10px) rotate(270deg);
            }
            100% { 
              transform: translateY(-130vh) translateX(0) rotate(360deg); 
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default FloatingHearts;
