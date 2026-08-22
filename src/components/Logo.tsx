import React, { useState } from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "w-32 h-32" }: LogoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <svg viewBox="0 0 120 120" className={`${className} drop-shadow-2xl`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gold-border" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFDF73" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#996515" />
          </linearGradient>
          <linearGradient id="red-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4B4B" />
            <stop offset="100%" stopColor="#CC0000" />
          </linearGradient>
          <linearGradient id="blue-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4B8BFF" />
            <stop offset="100%" stopColor="#0033CC" />
          </linearGradient>
          <linearGradient id="green-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4CFF4C" />
            <stop offset="100%" stopColor="#009900" />
          </linearGradient>
          <linearGradient id="yellow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFF4D" />
            <stop offset="100%" stopColor="#CCCC00" />
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.5" />
          </filter>
        </defs>

        <rect x="2" y="2" width="116" height="116" rx="24" fill="#0f172a" stroke="url(#gold-border)" strokeWidth="4" filter="url(#shadow)" />
        
        <rect x="10" y="10" width="100" height="100" rx="16" fill="#ffffff" />
        
        <rect x="14" y="14" width="36" height="36" rx="8" fill="url(#red-gradient)" />
        <circle cx="23" cy="23" r="5" fill="white" opacity="0.9" />
        <circle cx="41" cy="41" r="5" fill="white" opacity="0.9" />
        
        <rect x="70" y="14" width="36" height="36" rx="8" fill="url(#green-gradient)" />
        <circle cx="79" cy="23" r="5" fill="white" opacity="0.9" />
        <circle cx="97" cy="41" r="5" fill="white" opacity="0.9" />
        
        <rect x="14" y="70" width="36" height="36" rx="8" fill="url(#blue-gradient)" />
        <circle cx="23" cy="79" r="5" fill="white" opacity="0.9" />
        <circle cx="41" cy="97" r="5" fill="white" opacity="0.9" />
        
        <rect x="70" y="70" width="36" height="36" rx="8" fill="url(#yellow-gradient)" />
        <circle cx="79" cy="79" r="5" fill="white" opacity="0.9" />
        <circle cx="97" cy="97" r="5" fill="white" opacity="0.9" />
        
        <polygon points="60,42 66,54 78,54 68,62 72,74 60,66 48,74 52,62 42,54 54,54" fill="url(#gold-border)" filter="url(#shadow)"/>
        
        <path d="M 54 10 L 54 110 M 66 10 L 66 110" stroke="#e2e8f0" strokeWidth="2" />
        <path d="M 10 54 L 110 54 M 10 66 L 110 66" stroke="#e2e8f0" strokeWidth="2" />
      </svg>
    );
  }

  return (
    <img 
      src="/loudomax-icon.png" 
      alt="Ludo Max" 
      onError={() => setError(true)} 
      className={`${className} object-contain`} 
    />
  );
}
