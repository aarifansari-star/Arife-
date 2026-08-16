import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Map player colors to Tailwind classes
export const colorMap = {
  red: {
    bg: 'bg-red-500',
    border: 'border-red-600',
    text: 'text-red-500',
    lightBg: 'bg-red-100',
    homeBg: 'bg-red-50',
    shadow: 'shadow-red-500/50'
  },
  green: {
    bg: 'bg-green-500',
    border: 'border-green-600',
    text: 'text-green-500',
    lightBg: 'bg-green-100',
    homeBg: 'bg-green-50',
    shadow: 'shadow-green-500/50'
  },
  yellow: {
    bg: 'bg-yellow-400',
    border: 'border-yellow-500',
    text: 'text-yellow-500',
    lightBg: 'bg-yellow-100',
    homeBg: 'bg-yellow-50',
    shadow: 'shadow-yellow-400/50'
  },
  blue: {
    bg: 'bg-blue-500',
    border: 'border-blue-600',
    text: 'text-blue-500',
    lightBg: 'bg-blue-100',
    homeBg: 'bg-blue-50',
    shadow: 'shadow-blue-500/50'
  }
};
