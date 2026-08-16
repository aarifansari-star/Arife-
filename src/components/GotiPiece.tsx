import React from 'react';
import { PlayerColor } from '../types';

export const GotiPiece = ({ color, skinId = 'classic' }: { color: PlayerColor, skinId?: string }) => {
  const baseHex = {
    red: '#ef4444',
    green: '#22c55e',
    yellow: '#eab308',
    blue: '#3b82f6'
  }[color];

  let hex = baseHex;
  let highlight = '#ffffff';
  let shadow = '#000000';
  let filter = 'drop-shadow(0px 4px 3px rgba(0,0,0,0.4))';
  
  const isGem = ['ruby', 'emerald', 'sapphire', 'diamond'].includes(skinId);
  const isMetallic = ['silver', 'gold', 'royal'].includes(skinId);
  const isGlow = ['fire', 'ice', 'lightning', 'galaxy', 'cosmic', 'legendary'].includes(skinId);

  if (skinId === 'silver') { hex = '#cbd5e1'; highlight = '#ffffff'; shadow = '#475569'; }
  if (skinId === 'gold' || skinId === 'royal') { hex = '#fbbf24'; highlight = '#fef08a'; shadow = '#713f12'; }
  if (skinId === 'shadow') { hex = '#1e293b'; highlight = baseHex; shadow = '#020617'; }
  if (skinId === 'diamond') { highlight = '#ffffff'; shadow = '#64748b'; filter = `drop-shadow(0px 0px 6px #67e8f9)`; }
  
  if (isGlow) {
    if (skinId === 'fire') filter = `drop-shadow(0px -4px 10px #f97316)`;
    if (skinId === 'ice') filter = `drop-shadow(0px 0px 10px #67e8f9)`;
    if (skinId === 'lightning') filter = `drop-shadow(0px 0px 10px #fde047)`;
    if (skinId === 'galaxy') filter = `drop-shadow(0px 0px 12px #a855f7)`;
    if (skinId === 'cosmic') filter = `drop-shadow(0px 0px 15px #6366f1)`;
    if (skinId === 'legendary') filter = `drop-shadow(0px 0px 20px #fde047)`;
  }

  const accentHex = baseHex;

  return (
    <svg viewBox="0 0 100 120" className="w-full h-full" style={{ filter }}>
      <defs>
        <radialGradient id={`head-${color}-${skinId}`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor={highlight} stopOpacity={isGem ? "0.9" : "0.8"} />
          <stop offset="20%" stopColor={hex} />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id={`body-${color}-${skinId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={shadow} stopOpacity="0.4" />
          <stop offset="20%" stopColor={hex} />
          <stop offset="80%" stopColor={hex} />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={`base-${color}-${skinId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={highlight} stopOpacity="0.5" />
          <stop offset="50%" stopColor={hex} />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.7" />
        </linearGradient>
      </defs>
      
      {/* Base thickness */}
      <path d="M 20,100 Q 50,115 80,100 L 80,108 Q 50,123 20,108 Z" fill={shadow} opacity="0.6" />
      
      {/* Base top */}
      <ellipse cx="50" cy="100" rx="30" ry="12" fill={`url(#base-${color}-${skinId})`} />
      
      {/* Body */}
      {isGem ? (
        <path d="M 35,98 L 42,45 L 58,45 L 65,98 Z" fill={`url(#body-${color}-${skinId})`} stroke={highlight} strokeWidth="1" opacity="0.9" />
      ) : (
        <path d="M 35,98 L 42,45 L 58,45 L 65,98 Z" fill={`url(#body-${color}-${skinId})`} />
      )}
      
      {/* Body Color Band for Metallic/Shadow */}
      {(isMetallic || skinId === 'shadow') && (
        <path d="M 38,70 L 40,55 L 60,55 L 62,70 Z" fill={accentHex} opacity="0.9" />
      )}
      
      {/* Collar */}
      <ellipse cx="50" cy="45" rx="14" ry="5" fill={(isMetallic || skinId === 'shadow') ? accentHex : `url(#base-${color}-${skinId})`} />
      <path d="M 36,45 Q 50,53 64,45 L 64,48 Q 50,56 36,48 Z" fill={shadow} opacity="0.3" />
      
      {/* Head */}
      {isGem ? (
        <path d="M 50,4 L 72,26 L 50,48 L 28,26 Z" fill={`url(#head-${color}-${skinId})`} stroke={highlight} strokeWidth="1" />
      ) : (
        <circle cx="50" cy="26" r="22" fill={`url(#head-${color}-${skinId})`} />
      )}

      {/* Overlays */}
      {skinId === 'royal' && (
        <path d="M 38,10 L 44,20 L 50,8 L 56,20 L 62,10 L 58,26 L 42,26 Z" fill="#fbbf24" stroke="#713f12" strokeWidth="0.5" />
      )}
      {skinId === 'galaxy' && (
        <g fill="#ffffff" opacity="0.8">
          <circle cx="45" cy="20" r="1.5" />
          <circle cx="55" cy="30" r="1" />
          <circle cx="40" cy="35" r="2" />
          <circle cx="60" cy="15" r="1.5" />
          <circle cx="50" cy="70" r="1" />
          <circle cx="45" cy="85" r="1.5" />
        </g>
      )}
      {skinId === 'cosmic' && (
        <g fill={accentHex} opacity="0.9">
          <circle cx="50" cy="26" r="8" filter="blur(2px)" />
          <circle cx="50" cy="26" r="3" fill="#ffffff" />
        </g>
      )}
      {skinId === 'legendary' && (
        <g fill="none" stroke={highlight} strokeWidth="2" opacity="0.7">
          <path d="M 30,10 Q 50,-10 70,10" />
          <path d="M 30,42 Q 50,62 70,42" />
        </g>
      )}
      {skinId === 'lightning' && (
        <path d="M 55,10 L 45,26 L 55,26 L 45,42 L 52,28 L 42,28 Z" fill="#fde047" />
      )}
      {skinId === 'fire' && (
        <path d="M 40,26 Q 50,10 60,26 Q 55,40 50,40 Q 45,40 40,26 Z" fill="#f97316" opacity="0.8" />
      )}
      {skinId === 'ice' && (
        <path d="M 50,10 L 55,26 L 70,26 L 58,35 L 62,50 L 50,40 L 38,50 L 42,35 L 30,26 L 45,26 Z" fill="#cffafe" opacity="0.6" />
      )}
    </svg>
  );
};
