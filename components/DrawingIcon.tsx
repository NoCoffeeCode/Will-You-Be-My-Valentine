
import React from 'react';

interface DrawingIconProps {
  type: string;
  className?: string;
  style?: React.CSSProperties;
}

// Fix: Corrected component definition to properly type props and added style support for SVG/div elements
const DrawingIcon: React.FC<DrawingIconProps> = ({ type, className = "", style }) => {
  switch (type) {
    case 'teddy_bear':
      return (
        <svg className={className} style={style} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="30" cy="35" r="10" fill="#A0522D" />
          <circle cx="70" cy="35" r="10" fill="#A0522D" />
          <circle cx="30" cy="35" r="6" fill="#CD853F" />
          <circle cx="70" cy="35" r="6" fill="#CD853F" />
          <circle cx="50" cy="50" r="25" fill="#A0522D" />
          <ellipse cx="50" cy="58" rx="10" ry="8" fill="#F5DEB3" />
          <circle cx="50" cy="55" r="3" fill="#333" />
          <circle cx="42" cy="48" r="2.5" fill="#333" />
          <circle cx="58" cy="48" r="2.5" fill="#333" />
          <ellipse cx="50" cy="85" rx="22" ry="18" fill="#A0522D" />
          <ellipse cx="32" cy="78" rx="8" ry="12" fill="#A0522D" transform="rotate(-15 32 78)" />
          <ellipse cx="68" cy="78" rx="8" ry="12" fill="#A0522D" transform="rotate(15 68 78)" />
          <rect x="35" y="65" width="30" height="20" rx="2" fill="white" stroke="#ddd" strokeWidth="0.5" />
          <path d="M35 65 L50 75 L65 65" stroke="#ddd" fill="none" />
          <path d="M47 70 Q50 67 53 70 Q53 73 50 76 Q47 73 47 70 Z" fill="#ff4d88" />
        </svg>
      );
    case 'char_cat': return <div className={`text-4xl ${className}`} style={style}>🐱💕</div>;
    case 'char_penguin': return <div className={`text-4xl ${className}`} style={style}>🐧❤️</div>;
    case 'char_bunny': return <div className={`text-4xl ${className}`} style={style}>🐰💖</div>;
    case 'char_cloud': return <div className={`text-4xl ${className}`} style={style}>☁️💘</div>;
    case 'char_dino': return <div className={`text-4xl ${className}`} style={style}>🦖💌</div>;
    case 'char_owl': return <div className={`text-4xl ${className}`} style={style}>🦉💓</div>;
    case 'char_sun': return <div className={`text-4xl ${className}`} style={style}>☀️🥰</div>;
    case 'char_pig': return <div className={`text-4xl ${className}`} style={style}>🐷💝</div>;
    case 'char_elephant': return <div className={`text-4xl ${className}`} style={style}>🐘🎈</div>;
    case 'char_ghost': return <div className={`text-4xl ${className}`} style={style}>👻🤍</div>;
    case 'char_dog': return <div className={`text-4xl ${className}`} style={style}>🐶🐾</div>;
    case 'char_fox': return <div className={`text-4xl ${className}`} style={style}>🦊✨</div>;
    case 'char_monkey': return <div className={`text-4xl ${className}`} style={style}>🐵🍌</div>;
    case 'char_panda': return <div className={`text-4xl ${className}`} style={style}>🐼🎋</div>;
    case 'small_flowers':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" fill="#ff99cc" />
          <circle cx="12" cy="7" r="3" fill="#ff4d88" />
          <circle cx="12" cy="17" r="3" fill="#ff4d88" />
          <circle cx="7" cy="12" r="3" fill="#ff4d88" />
          <circle cx="17" cy="12" r="3" fill="#ff4d88" />
        </svg>
      );
    case 'floating_hearts':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="#ff4d88">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      );
    case 'doodles_of_roses':
      return (
        <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="#ff4d88" strokeWidth="1.5">
           <path d="M12 10c2-3 6-2 6 2s-4 6-6 8c-2-2-6-4-6-8s4-5 6-2z" />
           <path d="M12 18v4" stroke="#4d7c0f" />
           <path d="M12 20l-3-1" stroke="#4d7c0f" />
        </svg>
      );
    case 'heart_sparkles':
      return (
        <div className={`relative ${className}`} style={style}>
          <span className="absolute top-0 left-0 animate-ping">✨</span>
          <span className="text-2xl">💖</span>
          <span className="absolute bottom-0 right-0 animate-pulse text-xs">✨</span>
        </div>
      );
    case 'big_heart':
      return (
        <svg className={`${className} animate-pulse`} style={style} viewBox="0 0 24 24" fill="#ff4d88">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      );
    case 'cute_flowers':
      return (
        <div className={`flex gap-2 ${className}`} style={style}>
           <span className="text-3xl">🌸</span>
           <span className="text-3xl">🌷</span>
           <span className="text-3xl">🌺</span>
        </div>
      );
    default:
      return null;
  }
};

export default DrawingIcon;
