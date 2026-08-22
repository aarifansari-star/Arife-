export interface CurrencyConfig {
  code: string;
  symbol: string;
  rateFromINR: number;
}

export const COUNTRY_CURRENCY_MAP: Record<string, CurrencyConfig> = {
  "India 🇮🇳": { code: "INR", symbol: "₹", rateFromINR: 1.0 },
  "Pakistan 🇵🇰": { code: "PKR", symbol: "₨", rateFromINR: 3.33 },
  "Bangladesh 🇧🇩": { code: "BDT", symbol: "৳", rateFromINR: 1.31 },
  "Nepal 🇳🇵": { code: "NPR", symbol: "रू", rateFromINR: 1.6 },
  "Sri Lanka 🇱🇰": { code: "LKR", symbol: "LKR ", rateFromINR: 3.6 },
  "United States 🇺🇸": { code: "USD", symbol: "$", rateFromINR: 0.012 },
  "United Kingdom 🇬🇧": { code: "GBP", symbol: "£", rateFromINR: 0.0095 },
  "Canada 🇨🇦": { code: "CAD", symbol: "C$", rateFromINR: 0.016 },
  "Australia 🇦🇺": { code: "AUD", symbol: "A$", rateFromINR: 0.018 },
  "United Arab Emirates 🇦🇪": { code: "AED", symbol: "د.إ ", rateFromINR: 0.044 },
  "Saudi Arabia 🇸🇦": { code: "SAR", symbol: "ر.س ", rateFromINR: 0.045 },
  "Qatar 🇶🇦": { code: "QAR", symbol: "ر.ق ", rateFromINR: 0.044 },
  "Germany 🇩🇪": { code: "EUR", symbol: "€", rateFromINR: 0.011 },
  "France 🇫🇷": { code: "EUR", symbol: "€", rateFromINR: 0.011 },
  "Italy 🇮🇹": { code: "EUR", symbol: "€", rateFromINR: 0.011 },
  "Spain 🇪🇸": { code: "EUR", symbol: "€", rateFromINR: 0.011 },
  "Japan 🇯🇵": { code: "JPY", symbol: "¥", rateFromINR: 1.8 },
  "South Korea 🇰🇷": { code: "KRW", symbol: "₩", rateFromINR: 16.0 },
  "China 🇨🇳": { code: "CNY", symbol: "¥", rateFromINR: 0.086 },
  "Russia 🇷🇺": { code: "RUB", symbol: "₽", rateFromINR: 1.1 },
  "Brazil 🇧🇷": { code: "BRL", symbol: "R$", rateFromINR: 0.06 },
  "South Africa 🇿🇦": { code: "ZAR", symbol: "R", rateFromINR: 0.23 },
  "Other": { code: "USD", symbol: "$", rateFromINR: 0.012 },
};

export const DEFAULT_CURRENCY = COUNTRY_CURRENCY_MAP["India 🇮🇳"];

export function getCurrencyForCountry(country?: string | null): CurrencyConfig {
  if (!country) return DEFAULT_CURRENCY;
  return COUNTRY_CURRENCY_MAP[country] || DEFAULT_CURRENCY;
}

export function formatRewardAmount(inrAmount: number, currency: CurrencyConfig): string {
  const convertedAmount = inrAmount * currency.rateFromINR;
  
  let formatted: string;
  if (currency.rateFromINR < 0.1) {
    // Currencies like USD, EUR, GBP
    formatted = convertedAmount.toFixed(2);
    // Remove .00 if it's a whole number
    if (formatted.endsWith('.00')) {
      formatted = formatted.slice(0, -3);
    }
  } else {
    // Currencies like INR, KRW, PKR
    formatted = Math.round(convertedAmount).toString();
  }
  return `${currency.symbol}${formatted}`;
}

export function calculateEstimatedValue(diamonds: number, currency: CurrencyConfig): string {
  let inrValue = 0;
  if (diamonds >= 70000) inrValue = 500;
  else if (diamonds >= 28000) inrValue = 200;
  else if (diamonds >= 14000) inrValue = 100;
  else if (diamonds >= 7000) inrValue = 50;
  else if (diamonds >= 2800) inrValue = 20;
  else if (diamonds >= 1400) inrValue = 10;
  
  return formatRewardAmount(inrValue, currency);
}
